// The URL from with the metrics are fetched
// You may want to use a localhost during development
const MONITOR_URL = "https://hub.stenci.la/internal/monitor";
// const MONITOR_URL = "http://localhost:9090" // Locally running `monitor`
// const MONITOR_URL = "http://localhost:9000/internal/monitor" // Locally running `monitor`, proxied by `router`

// The definitions of each plot
// See https://prometheus.io/docs/prometheus/latest/querying/examples/
// and the Prometheus graphing tool for help constructing queries:
// https://hub.stenci.la/internal/monitor
const PLOTS = [
  {
    title: "Services: up/down",
    query: 'up{job=~"manager|broker|overseer"}'
  },
  {
    title: "Manager: exceptions by type",
    query: "rate(django_http_exceptions_total_by_type_total[5m])"
  },
  {
    title: "Manager: request latency (s)",
    query:
      "sum(rate(django_http_requests_latency_seconds_by_view_method_sum[5m]))"
  },
  {
    title: "Manager: request body size (b)",
    query: "rate(django_http_requests_body_total_bytes_sum[5m])"
  },
  {
    title: "Overseer: workers",
    query: "overseer_workers_count"
  },
  {
    title: "Overseer: events",
    query: "sum(rate(overseer_event_processing_count[5m]))"
  },
  {
    title: "Overseer: event processing (s)",
    query: "sum(rate(overseer_event_processing_sum[5m]))"
  },
  {
    title: "Broker: queues",
    query: "rabbitmq_queues"
  },
  {
    title: "Broker: queue messages",
    query: "rabbitmq_queue_messages"
  },
];

// Periods of time expressed in seconds
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

/**
 * Fetch a series of data for a metric
 *
 * @param {*} metric The time series selector to fetch.
 *                   See https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors
 * @param {*} resolution Time series resolution (seconds)
 * @param {*} period The time series length (seconds)
 */
function fetchSeries(metric = "up", resolution = minute, period = day) {
  const end = new Date();
  const start = new Date(end - period * 1000);
  const url = `${MONITOR_URL}/api/v1/query_range?query=${metric}&start=${start.toISOString()}&end=${end.toISOString()}&step=${resolution}s`;
  return fetch(url).then(response => response.json());
}

/**
 * Reshape the result of a Prometheus range query to a set of columns.
 *
 * That is, goes from this:
 *
 *    https://prometheus.io/docs/prometheus/latest/querying/api/#range-queries
 *
 * to this,
 *
 *    https://github.com/leeoniya/uPlot/tree/master/docs#data-format
 *
 * @param data The result from a Prometheus range query.
 * @param transform The function to use to transform the y values
 */
function reshapeResult(result, transform = parseFloat) {
  const results = result.data.result;

  // The uPlot `series.label` come from the `metric` properties
  const series = results.map(({ metric }, index) => {
    const { __name__, instance, ...props } = metric;
    const label = Object.values(props)
      .map(prop => `${prop}`)
      .join(" ");
    const color = `hsla(${200 +
      ((index - 1) * 360) / results.length}, 80%, 50%, 0.6)`;
    return {
      label,
      stroke: color,
      fill: color
    };
  });

  // The uPlot x-axis times are taken from the first column of the first result
  const times = results[0].values.map(row => row[0]);

  // The uPlot y-axis values are from the second column of each metric
  const values = results.map(({ metric, values }) => {
    return values.map(row => transform(row[1]));
  });

  return {
    series: [{}, ...series],
    data: [times, ...values]
  };
}

/**
 * Create all da plots!
 */
async function createPlots() {
  // Create an element to put plots in
  const plots = document.createElement("div");
  plots.style.margin = "2em auto;";
  const container = document.querySelector("main .container");
  container.append(plots);

  // Override some styling for the plots created
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = ".uplot {font-family: inherit; margin: 3em 0;}";
  document.getElementsByTagName("head")[0].appendChild(style);

  // Calculate some standard uPlot options to be used as defaults
  //for all plots.
  const width = Math.min(Math.max(300, container.clientWidth), 900);
  const height = Math.max(200, width * 0.4);
  const opts = {
    width,
    height
  };

  // Create each plot
  for (const { title, query } of PLOTS) {
    await fetchSeries(query, minute, day)
      .then(result => reshapeResult(result))
      .then(({ series, data }) => {
        new uPlot(
          {
            ...opts,
            title,
            series
          },
          data,
          plots
        );
      })
      .catch(error => console.error(error));
  }
}

// Wait for the plots' container to be present
document.addEventListener("DOMContentLoaded", () =>
  setTimeout(createPlots, 1000)
);
