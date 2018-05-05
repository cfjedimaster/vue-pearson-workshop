const app = new Vue({
	el:'#app',
	data:{
		input:''
	},
	computed:{
		palindrome:function() {
			if(this.input === '') return false;
			// remove non text
			let text = this.input.replace(/[^a-zA-Z]+/g,'').toLowerCase();
			console.log('text is '+text);
			let reverse = text.split('').reverse().join('').toLowerCase();
			console.log('reverse is '+reverse);
			return text === reverse;
		}
	}

});