// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  console.log('Hello, world!');

})());


d3.csv('data/small_data.csv').then((data) => {

	//print data to log
	console.log(data);


})