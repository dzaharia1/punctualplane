var trends = {
	performance: {
		"slug": "monthly average tardiness (minutes)",
		"data": "some data"
	},
	causeOfDelay: {
		"slug": "top 4 causes of delay",
		"data": "some data"
	}
};

var stats = {
	"delayProbability": {
		"slug": "Probability of Delay",
		"value": 47.3,
		"unit": "%"
	},
	"cancelProbability": {
		"slug": "Probability of Cancellation",
		"value": 12.1,
		"unit": "%"
	},
	"otherStat": {
		"slug": "Avg. Flight Distance",
		"value": 3000,
		"unit": "mi"
	}
};

var data = {
	trends: trends,
	stats: stats
}

module.exports = data;