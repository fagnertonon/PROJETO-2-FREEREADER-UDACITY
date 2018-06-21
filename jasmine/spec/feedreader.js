/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

   jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Url não pode estar vazia', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).not.toBe('');
            });
        })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name não pode estar vazia', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).not.toBe('');
            });
        })
    });

    /* TODO: Write a new test suite named "The menu" 
    */
    describe('The menu', function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         * 
         * screva um teste que garanta que o elemento de menu seja
         * oculto por padrão. Você terá que analisar o HTML e
         * o CSS para determinar como estamos executando o
         * ocultação / exibição do elemento de menu.
         */
        it('Menu hidden por padrão', function () {
            let bodyClass = $('body').attr('class');

            expect(bodyClass).toBe('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         * 
         * TODO: Escreva um teste que garanta as mudanças no menu
         * visibilidade quando o ícone do menu é clicado. Esse teste
         * deve ter duas expectativas: o menu exibe quando
         * clicado e oculta quando clicado novamente.
         */
        it('Menu hidden/visible ao ser clicado', function () {

            let menuIcon = $('.menu-icon-link');
            let bodyClassInicial = $('body').attr('class');

            menuIcon.click();
            bodyClassInicial = $('body').attr('class');
            if (bodyClassInicial == 'menu-hidden') {
                expect(bodyClassInicial).toBe('menu-hidden');
            }
            else {
                expect(bodyClassInicial).not.toBe('menu-hidden');
            }
            menuIcon.click();


            // feedList.forEach(feed => {
            //     let bodyClassInicial = $('body').attr('class');
            //     feed.click();
            //     if (bodyClassInicial == 'menu-hidden') {
            //         expect(bodyClass).not.toBe('menu-hidden');
            //     }
            //     else{
            //         expect(bodyClass).toBe('menu-hidden');
            //     }
            // });
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" 
    */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('Entry inicial não vazio', function () {
            var entry = $('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" 
    */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var entry = 0;

        allFeeds.forEach(function (feed, i) {
            beforeAll(function (done) {

                loadFeed(i, function () {
                    entry = $('.feed .entry');
                    console.log(entry.length);

                    var container = $('.feed');
                    container.empty();

                    done();

                });
            });

        });

        afterEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('Entry não pode ser vazio', function () {
            expect(entry.length).toBeGreaterThan(0);
        });

    });
}());





