var amount = 12

var msg = formatCurrency`blablabla${amount}`

function formatCurrency (strings, ...values) {
  console.log({ strings });
  console.log({ values });
}