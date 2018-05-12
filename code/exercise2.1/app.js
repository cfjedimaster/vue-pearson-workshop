Vue.component('result', {
	props:['image','artist','track','released'],
	template:`
	<div class="result">
		<img :src="image">
		<b>Artist:</b> {{artist}}<br/>
		<b>Track:</b> {{track}}<br/>
		<b>Released:</b> {{released | formatDate}}
		<br clear="left">
	</div>
	`
});

Vue.filter('formatDate', function(d) {
	if(!window.Intl) return d;
	return new Intl.DateTimeFormat('en-US').format(new Date(d));
}); 

const app = new Vue({
	el:'#app',
	data:{
		term:'',
		results:[],
		noResults:false,
		searching:false
	},
	methods:{
		search:function() {
			this.noResults = false;
			this.searching = true;
			fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(this.term)}&limit=10&media=music`)
			.then(res => res.json())
			.then(res => {
				this.searching = false;
				this.results = res.results;
				this.noResults = this.results.length === 0;
			});
		}
	}
});