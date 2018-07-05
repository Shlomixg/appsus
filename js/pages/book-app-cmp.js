'use strict';

import bookService from '../services/book-service.js';
import bookList from '../cmps/book/book-list-cmp.js';
import bookFilter from '../cmps/book/book-filter-cmp.js';
import bookAdd from '../cmps/book/book-add-cmp.js';

export default {
    components: {
        'book-list': bookList,
        'book-filter': bookFilter,
        'book-add': bookAdd
    },
    template: `
        <section class="container book-app">
            <book-filter @filtered="setFilter" ></book-filter>
            <book-add></book-add>
            <book-list :books="booksToShow" ></book-list>
        </section>
    `,
    data() {
        return {
            books: [],
            filter: null
        }
    },
    created() {
        bookService.query()
			.then(books => {
                this.books = books;
			})
    },
    methods: {
        setFilter(filter) {
            this.filter = filter;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filter) return this.books;
            
            if (this.filter.toPrice === '') this.filter.toPrice = 10000;
            return this.books.filter(book =>
                book.title.includes(this.filter.byName.toLowerCase()) &&
                book.listPrice.amount >= this.filter.fromPrice &&
                book.listPrice.amount <= this.filter.toPrice);
        }
    },
};