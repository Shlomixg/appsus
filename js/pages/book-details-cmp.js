'use strict';

import bookService from '../services/book-service.js';
import utilsService from '../services/utils-service.js';
import longText from '../cmps/long-text-cmp.js';
import reviewAdd from '../cmps/book/review-add-cmp.js';
import reviewList from '../cmps/book/review-list-cmp.js';

export default {
    components: {
        'long-text': longText,
        'review-add': reviewAdd,
        'review-list': reviewList
    },
    template: `
        <section v-if="book">
            <section class="book-details flex">
                <img :src="book.thumbnail" :title="book.title " :alt="book.title" />
                <ul class="data clean-list flex column">
                    <li>
                        <button class="btn" @click="$router.push('/book')">Back</button>
                    </li>
                    <li>
                        <h3>{{book.title}}</h3>
                    </li>
                    <li>
                        <h4>{{book.subtitle}}</h4>
                    </li>
                    <li>
                        <span class="field">By:</span>
                        <span>
                            {{bookAuthors}},
                            {{book.publishedDate}}, 
                            {{book.language}}
                        </span>
                    </li>
                    <li>
                        <long-text :txt="book.description"></long-text>
                    </li>
                    <li>
                        <span class="field">Pages:</span> {{book.pageCount}}
                    </li>
                    <li>
                        <span class="field">Catgories:</span>
                        <ul style="margin-top: 5px;">
                            <li v-for="cat in book.categories">{{cat}}</li>
                        </ul>
                    </li>
                    <li>
                        <span class="field">Price:</span> {{currencyIcon}}{{book.listPrice.amount}}
                    </li>
                    <li>
                        <span class="badge" :class="{cheap: book.listPrice.amount < 20, expensive: book.listPrice.amount > 150}">
                            {{isForSale}}
                        </span>
                        <span class="badge" v-if="bookLength">{{bookLength}}</span>
                        <span class="badge" v-if="bookAge">{{bookAge}}</span>
                    </li>
                </ul>
            </section>

            <review-list :book="book" @delete-review="deleteReview"></review-list>

            <review-add @add-review="saveReview"></review-add>

        </section>
    `,
    data() {
        return {
            book: null,
        }
    },
    created() {
        this.loadBook();
    },
    methods: {
        loadBook() {
            bookService.getBookById(this.$route.params.bookId)
                .then(book => this.book = book)
        },
        saveReview(review) {
            bookService.addBookReview(this.book.id, review);
        },
        deleteReview(reviewIdx) {
            bookService.removeBookReview(this.book.id, reviewIdx)
        }
        // nextBook() {
        // 	bookService.getNextBookId(this.book.id)
        // 		.then(bookId => {
        // 			this.$router.push(`/book/${bookId}`);
        // 		})
        // }
    },
    computed: {
        bookAuthors() {
            let bookAuthors = this.book.authors;
            if (bookAuthors.length === 1) return bookAuthors[0];
            else {
                let strAuthors = '';
                for (let i = 0; i < bookAuthors.length; i++) {
                    if (i === bookAuthors.length - 1) strAuthors += `& ${bookAuthors[i]}`;
                    else strAuthors += `${bookAuthors[i]}, `;
                }
                return strAuthors;
            }
        },
        isForSale() {
            return (this.book.listPrice.isOnSale) ? 'Sale!' : 'No Sale For You';
        },
        bookAge() {
            let currYear = new Date().getFullYear();
            if (currYear - this.book.publishedDate > 10) return 'Veteran Book';
            else if (currYear === this.book.publishedDate) return 'New!';
            return '';
        },

        bookLength() {
            if (this.book.pageCount > 500) return 'Long Reading';
            else if (this.book.pageCount > 200 && this.book.pageCount <= 500) return 'Decent Reading';
            else if (this.book.pageCount < 100) return 'Light Reading';
            return '';
        },
        currencyIcon() {
            return utilsService.getCurrencyIcon(this.book.listPrice.currencyCode);
        }
    },
    watch: {
        '$route.params.bookId': function (newBookId) {
            console.log('$route.params.bookId has changed!', newBookId);
            this.loadBook();
        }
    },
};