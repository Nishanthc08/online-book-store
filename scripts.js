document.addEventListener('DOMContentLoaded', () => {
    const books = [
        {
            title: 'The Great Gatsby',
            description: 'A novel written by American author F. Scott Fitzgerald.',
            price: 10.99
        },
        {
            title: '1984',
            description: 'A dystopian socail science fiction novel and cautionary tale, written by the English writed George Orwell.',
            price: 8.99
        },
        {
            title: 'To Kill a Mockingbird',
            description: 'A novel by Harper Lee published in 1960.',
            price: 7.99
        }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const searchInput = document.getElementById('search');
    const bookList = document.getElementById('book-list');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    const renderBooks = (booksToRender) => {
        bookList.innerHTML = '';
        booksToRender.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.description}</p>
                <p>$${book.price.toFixed(2)}</p>
                <button onclick="addToCart('${book.title}')">Add to Cart</button>
            `;
            bookList.appendChild(bookItem);
        });
    };

    const renderCart = () => {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.title}')">Remove</button>
            `;
            cartList.appendChild(cartItem);
            total += item.price;
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    };

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.description.toLowerCase().includes(query)
        );
        renderBooks(filteredBooks);
    });

    window.addToCart = (title) => {
        const book = books.find(b => b.title === title);
        if(book) {
            cart.push(book);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    window.removeFromCart = (title) => {
        const index = cart.findIndex(b => b.title === title);
        if(index > -1) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    const params = new URLSearchParams(window.location.search);
    const bookTitle = params.get('title');
    if(bookTitle) {
        const book = books.find(b => b.title === bookTitle);
        if(book) {
            document.getElementById('book-title').textContent = book.title;
            document.getElementById('book-description').textContent = book.description;
            document.getElementById('book-price').textContent = `$${book.price.toFixed(2)}`;
            document.getElementById('add-to-cart').addEventListener('click', () => addToCart(book.title));
        }
    }

    if(bookList) {
        renderBooks(books);
    }

    if(cartList) {
        renderCart();
    }
});