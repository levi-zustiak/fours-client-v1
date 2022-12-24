import axios from 'axios';

class TestApi {
    public api;

    constructor () {
        this.api = axios.create({baseURL:'https://jsonplaceholder.typicode.com'})
    }

    public getTodos() {
        const q = this.api.get('/todos')

        return q;
    }

    public getTodo(todo: number) {
        const q = this.api.get('https://jsonplaceholdde')
    }
}

export default TestApi;