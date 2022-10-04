// Decorator functions are functions take in a function as a parameter and "decorate" it with new behaviour
// As in, adding new functionality to an existing function and returning it

import axios from 'axios'

const sum = (...args) => {
	return [...args].reduce((prev, current) => {
		return prev + current
	})
}

//
const callCounter = (fn) => {
	let count = 0

	return (...args) => {
		console.log(`Function has ran ${(count += 1)} times`)

		return fn(...args)
	}
}

// callCounter with count 0 is saved to the test variable
// Which returns a function that logs the count and returns the result of sum
// const test = callCounter(sum)
// console.log(test(4, 5))
// console.log(test(2, 5))

// Async example

// Function that fetches data from a URL
const requestData = async (url) => {
	try {
		const { data } = await axios.get(url)

		return data
	} catch (error) {
		console.error(error)
	}
}

// Decorator function that takes in the function and then provides a log of time start and end of the data request
const timeOfRequest = (fn) => {
	return async (url) => {
		console.time('fn')
		const data = await fn(url)
		console.timeEnd('fn')

		return data
	}
}

// Fetch request that uses the composed functions to log
const fetchTodos = async () => {
	const time = timeOfRequest(requestData)

	const data = await time('https://jsonplaceholder.typicode.com/todos/1')
	console.log(data)
}

fetchTodos()
