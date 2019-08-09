import Vue from 'vue'

Vue.filter('currency', (value) => {
  if (!value || isNaN(value)) value = 0;
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return formatter.format(value);
})


//newline to linebreak
Vue.filter('nl2br', (value) => {
  if (!value) return ''
  return value.replace(/\n/g, '<br>')
})
