
$(function () {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    describe('RSS Feeds', function () {

        /* allfeeds deve contem pelo menos um feed */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* todos os feeds devem conter uma URL  */
        it('Url não pode estar vazia', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).not.toBe('');
            });
        })

        /* todos os feeds devem contem um nome */
        it('Name não pode estar vazia', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).not.toBe('');
            });
        })
    });

    describe('The menu', function () {

        /* ao ser iniciado o site de ter o menu oculto por padrão*/
        it('Menu hidden por padrão', function () {
            let bodyClass = $('body').hasClass('menu-hidden');

            expect(bodyClass).toBe(true);
        });


        /* Menu deve estar visível após primeiro click e oculto no segundo. */
        it('Menu hidden/visible ao ser clicado', function () {

            let menuIcon = $('.menu-icon-link');
            let bodyClassInicial;

            menuIcon.click();
            bodyClassInicial = $('body').hasClass('menu-hidden');
            expect(bodyClassInicial).toBe(false);

            menuIcon.click();
            bodyClassInicial = $('body').hasClass('menu-hidden');
            expect(bodyClassInicial).toBe(true);
            
        });
    });


    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* O Entry não pode ser vazio ao ser carregado.  */
        it('Entry inicial não vazio', function () {
            var entry = $('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        var entryOld, entryNew;

        beforeEach(function (done) {
            loadFeed(0, function () {
                entryOld = $('.feed').html();
                loadFeed(1, function () {
                    entryNew = $('.feed').html();
                    done();
                });
            })
        })

        /*Ao carregar um novo feed, os valores devem ser diferentes do anterior. */
        it('Entry não pode ser vazio', function () {
            expect(entryOld).not.toBe(entryNew);
        });
    });
}());





