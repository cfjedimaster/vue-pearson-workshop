const store = new Vuex.Store({
	state:{
		lastId:4,
		cats:[
			{id:1,name:"fred"},
			{id:2,name:"ginger"},
			{id:3,name:"nancy"},
			{id:4,name:"boris"}
		]
	},
	getters:{
		cats:function(state) {
			return state.cats;
		}
	},
	mutations:{
		newCat:function(state, name) {
			let id = state.lastId + 1;
			state.lastId = id;
			state.cats.push({id:id,name:name});
		},
		deleteCat:function(state, id) {
			state.cats = state.cats.filter(c => {
				return c.id != id;
			});
		}
	}

});

const app = new Vue({
	el:'#app',
	store,
	data:{
		newCat:''
	},
	methods:{
		addCat:function() {
			if(this.newCat === '') return;
			store.commit('newCat', this.newCat);
			this.newCat = '';
		},
		deleteCat:function(id) {
			store.commit('deleteCat', id);
		}
	},
	computed:{
		cats:function() {
			return store.getters.cats;
		}
	}
	
});