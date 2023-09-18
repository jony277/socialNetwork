const dayjs = require("dayjs");

function formatDate(date) {
 return dayjs(date).format("MM/DD/YYYY")
};

module.exports = {formatDate};