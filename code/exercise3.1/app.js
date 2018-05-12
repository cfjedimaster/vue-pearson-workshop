
const List = Vue.component('List', {
template:`
<div>
	<p v-if="loading"><i>Loading films...</i></p>
	<ul>
		<li v-for="film in films" :key="film.episode_id">
		<router-link :to="{ name:'film', params:{id:film.id} }">{{ film.title }}</router-link>
		</li>
	</ul>
</div>
	`,
	data:function() {
		return {
			loading:true,
			films:[]
		}
	},
	created:function() {
		fetch('https://swapi.co/api/films')
		.then(res => res.json())
		.then(res => {
			this.loading = false;
			/*
			there is no "id" field, just a URL one - so let's set it manually
			*/			
			this.films = res.results.map(film => {
				let parts = film.url.split('/');
				film.id = parts[parts.length-2];
				return film;
			});
		});
	}
});

const Detail = Vue.component('Detail', {
	template:`
<div>
	<div v-if="loading">
	<i>Loading film...</i>
	</div>
	<div v-else>
	<h2>{{film.title}}</h2>
	<p v-if="film.director">
	Director: {{film.director}}<br/>
	Released: {{film.release_date}}<br/>
	</p>

	<p>
	{{film.opening_crawl}}
	</p>

	<router-link to="/">Back</router-link>
	</div>
</div>
	`,
	data:function() {
		return {
			loading:true,
			film:{}
		}
	},
	created:function() {
		fetch('https://swapi.co/api/films/'+this.$route.params.id)
		.then(res => res.json())
		.then(res => {
			this.loading = false;
			this.film = res;
		});

	}

});

const router = new VueRouter({
	routes:[
		{
			path:'/',
			component:List,
		},
		{
			path:'/film/:id',
			name:'film',
			component:Detail
		}
	]
});

const app = new Vue({
	el:'#app',
	router
});
