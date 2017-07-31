import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
	title: null,

	didInsertElement() {
		this._super(...arguments);

		var data = [
			{label: 'Abulia', count: 10},
			{label: 'Betelgeuse', count: 20},
			{label: 'Cantaloupe', count: 30},
			{label: 'Dijkstra', count: 40}
		];

		var width = 360;
		var height = 360;
		var radius = Math.min(width, height) / 2;
		var donutWidth = 75;

		var color = d3.scaleOrdinal(d3.schemeCategory20b);

		var svg = d3.select('#container')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + (width / 2) +	',' + (height / 2) + ')');

		var arc = d3.arc()
			.innerRadius(radius - donutWidth)
			.outerRadius(radius);

		var pie = d3.pie()
			.value((d) => d.count)
			.sort(null);

		var path = svg.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', (d) => {
				return color(d.data.label);
			});
	}
});
