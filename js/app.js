/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 * Esta é a nossa aplicação de leitor de feeds RSS. Ele usa o Google
 * Feed Reader API para pegar feeds RSS como objeto JSON que podemos fazer
 * uso de. Ele também usa a biblioteca de modelos de guidão e
 * jQuery.
 */

// The names and URLs to all of the feeds we'd like available.
// Os nomes e URLs de todos os feeds que gostaríamos de disponibilizar.
var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        // name: '',
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 * 
 * Esta função inicia a nossa aplicação. O feed do Google
 * A API do Reader é carregada de forma assíncrona e, em seguida, chamará isso
 * função quando a API é carregada.
 */
function init() {
    // Load the first feed we've defined (index of 0).
    // Carregue o primeiro feed que definimos (índice de 0).
    loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 * 
 * Esta função realiza todo o necessário para carregar um
 * feed usando a API do Google Feed Reader. Então será
 * executar todas as operações do DOM necessárias para exibir
 * entradas de feed na página. Os feeds são referenciados por seus
 * posição do índice dentro do array allFeeds.
 * Esta função suporta um retorno de chamada como o segundo parâmetro
 * que será chamado depois de tudo ter sido executado com sucesso.
 */
 function loadFeed(id, cb) {
     var feedUrl = allFeeds[id].url,
         feedName = allFeeds[id].name;

     $.ajax({
       type: "POST",
       url: 'https://rsstojson.udacity.com/parseFeed',
       data: JSON.stringify({url: feedUrl}),
       contentType:"application/json",
       success: function (result, status){

                 var container = $('.feed'),
                     title = $('.header-title'),
                     entries = result.feed.entries,
                    //  entriesLen = entries.length,
                     entryTemplate = Handlebars.compile($('.tpl-entry').html());

                 title.html(feedName);   // Set the header text -- Definir o texto do cabeçalho
                 container.empty();      // Empty out all previous entries -- Esvazie todas as entradas anteriores

                 /* Loop through the entries we just loaded via the Google
                  * Feed Reader API. We'll then parse that entry against the
                  * entryTemplate (created above using Handlebars) and append
                  * the resulting HTML to the list of entries on the page.
                  * 
                  * Loop através das entradas que acabamos de carregar através do Google
                  * Feed Reader API. Vamos então analisar essa entrada contra o
                  * entryTemplate (criado acima usando o Handlebars) e anexar
                  * o HTML resultante para a lista de entradas na página.
                  */
                 entries.forEach(function(entry) {
                     container.append(entryTemplate(entry));
                 });

                 if (cb) {
                     cb();
                 }
               },
       error: function (result, status, err){
                 //run only the callback without attempting to parse result due to error
                 // executar apenas o retorno de chamada sem tentar analisar o resultado devido a erro
                 if (cb) {
                     cb();
                 }
               },
       dataType: "json"
     });
 }

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 * 
 * API do Google: carrega a API do leitor de feeds e define qual função
 * para chamar quando a API do Feed Reader terminar de carregar.
 */
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 * 
 * API do Google: carrega a API do leitor de feeds e define qual função
 * para chamar quando a API do Feed Reader terminar de carregar.
 */
$(function() {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     * 
     * Faz um loop em todos os nossos feeds, atribuindo uma propriedade id a
     * cada um dos feeds com base em seu índice dentro da matriz.
     * Em seguida, analisar esse feed contra o feedItemTemplate (criado
     * acima usando o Handlebars) e acrescente-o à lista de todos os
     * feeds disponíveis no menu.
     */
    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     * 
     * Quando um link em nossa lista de feeds é clicado, queremos ocultar
     * o menu, carregue o feed e evite a ação padrão
     * (seguindo o link) ocorra.
     */
    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu.
     * 
     * Quando o ícone do menu é clicado, precisamos alternar uma classe
     * no corpo para realizar a ocultação / exibição do nosso menu.
     */
    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });
}());
