"use strict";

(() => {


    // ----- Remove All Coins from Local Storage in Loading Page for a First Time-------- //

    localStorage.clear();


    // --------------------------------------------------------------------- //

    // ----- Page Container Variable -------- //

    const pageContainer = document.querySelector("#pageContainer");


    // --------------------------------------------------------------------- //

    // Create and display the enter page and navbar on loading:
    createNavbar();
    createEnterPage();


    // --------------------------------------------------------------------- //

    // ----- Navbar Events -------- //

    $("#enterPageLink").on("click", createEnterPage);
    $("#homeLink").on("click", createHome);
    $("#reportsLink").on("click", createReports);
    $("#aboutLink").on("click", createAbout);

    // Box search event:

    // "submit" event is for to stop the action of form submit when user press enter key.
    $("#searchForm").on("submit", stopFormSubmit);

    // "search" event is for when clicking on X inside the search box, is clear the search and display back all coins cards.
    $("#searchForm").on("keyup search", searchCoin);


    // --------------------------------------------------------------------- //

    // ----- Create and display Navbar -------- //

    function createNavbar() {

        // Access to navbarBox:
        const navbarBox = document.querySelector("#navbarBox");

        // Add the navbar to the navbar box:
        navbarBox.innerHTML = `
            <nav class="navbar navbar-expand-lg bg-dark border-bottom bg-body-tertiary border-body" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" id="enterPageLink">
                        <img src="assets/images/icons/navbar image.png" alt="Logo" width="30" height="24"
                            class="d-inline-block align-text-top">
                        Crypto-Currencies.com
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0 nav-underline">
                            <li class="nav-item">
                                <a class="nav-link" id="homeLink" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="reportsLink" href="#">Reports</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="aboutLink" href="#">About</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search" id="searchForm">
                            <input class="form-control me-2" type="search" placeholder="Search" id="searchBox">
                        </form>
                    </div>
                </div>
            </nav>
        `;
    }

    // --------------------------------------------------------------------- //

    // ----- Enter Page Container Section -------- //

    function createEnterPage() {

        // Create enter page and display:
        pageContainer.innerHTML = `
        <div class="enterPage">
            <h1>The World’s Leading Cryptocurrency Platform</h1>
            
            <br>
            
            <h4>Watch the Bitcoin, Ethereum, and all your favorite crypto</h4>
            
            <br>

            <div>
                <img src="assets/images/icons/v icon.png" alt="Logo" width="15" height="15" class="d-inline-block"> 
                Trusted by more than 80M users world-wide
            </div>
            
            <div>
                <img src="assets/images/icons/v icon.png" alt="Logo" width="15" height="15" class="d-inline-block"> 
                Leader in regulatory compliance and security certifications
            </div>
            
            <div>
                <img src="assets/images/icons/v icon.png" alt="Logo" width="15" height="15" class="d-inline-block"> 
                The industry’s most comprehensive insurance coverage and verified proof of reserves
            </div>
        </div>

        <p class="copyrights">© All Rights Reserved</p>

        <style>
            @media only screen and (max-width: 1069.8px) {
                .copyrights {
                    margin-top: 110px;
                }
            }
        
            @media only screen and (min-width: 1069.8px) {
                .copyrights {
                    margin-top: 153px;
                    margin-bottom: 0;
                }
            }
        </style>
        `;

        // After content is added, trigger fadeIn:
        fadeInPage();
    }


    // --------------------------------------------------------------------- //

    // ----- Home Page Container Section -------- //

    // Create home:
    async function createHome() {
        try {
            // Display loading spinner until the information displaying:
            pageContainer.innerHTML = `
                <div class="loaderSpinnerContainer">
                    <img src="assets/images/spinner.gif" width="150" height="150">
                    <h4 class="loadingText">Loading...</h4>
                </div>
            `;

            // Get the coins from api and display:
            const coins = await getJson("assets/json/coins.json");
            displayCoins(coins);
        }
        catch (err) {
            alert("Error" + err.message);
        }
    }

    // Display coins:
    function displayCoins(coins) {

        // Variable of all cards html:
        let allCards = "";

        for (let i = 0; i < coins.length; i++) {

            const coinName = doCapitalizeFirstLetterOnly(coins[i].name);

            // Div of coin card html:
            const div = `
                <div class="card text-bg-secondary" style="max-width: 14rem; width: 14rem;" data-card-name="${"card" + coinName}">
                
                    <div class="card-header" style="padding: 5px 0 8px 0;">
                        <div class="form-check form-switch form-check-reverse d-inline" style="margin: 0; padding: 0;">
                            <span>${coinName}</span>
                            <input class="form-check-input" type="checkbox" data-coin-name="${"card" + coinName}" style="margin: 0; padding: 0;">
                        </div>
                    </div>

                    <div class="card-body">
                        <h5 class="card-title" data-coin-symbol="${coins[i].symbol.toUpperCase()}">Symbol: ${coins[i].symbol.toUpperCase()}</h5>
                    </div>

                    <button type="button" class="btn btn-secondary moreInfoButtons" id="popoverBtn${i}" data-coin-id="${coins[i].id}" data-coin-number="${i}">
                        More Info
                    </button>
                </div>
            `;

            allCards += div;
        }

        // Display all cards:
        pageContainer.innerHTML = allCards;

        // Registration for the event clicking on "More Info":
        const moreInfoButtons = document.querySelectorAll(".card > .moreInfoButtons");
        for (const btn of moreInfoButtons) {
            // If clicked so toggle more info:
            btn.addEventListener("click", toggleMoreInfo);
        }

        // Registration for the event clicking on check box:
        const checkBoxes = document.querySelectorAll(".card > .card-header > .form-check > input");
        for (const checkBox of checkBoxes) {
            // If clicked so get selected and checking if it checked or unchecked:
            checkBox.addEventListener("click", getSelected);
        }

        // When user move to difference pages in the website, so checking if he already 
        // chosen some coins. if he are chosen already, so checking the already chosen coins as checked.
        if (selectedCoinsArr.length) selectedCoinsArr.every(coin => document.querySelector(`[data-coin-name="${coin.name}"]`).checked = true);

        // After content is added, trigger fadeIn:
        fadeInPage();
    }

    // Toggle more info:
    async function toggleMoreInfo() {

        try {
            // Defined variable:
            const coinId = this.getAttribute("data-coin-id");
            const btnNumber = this.getAttribute("data-coin-number");
            const prices = await getMoreInfo(coinId);
            const popoverBtn = document.querySelector(`#popoverBtn${btnNumber}`);

            // Close popover if open:
            const existingPopover = bootstrap.Popover.getInstance(popoverBtn);
            if (existingPopover) {
                existingPopover.dispose();
            }

            // Create new popover with the coin info:
            const newPopover = new bootstrap.Popover(popoverBtn, {
                trigger: 'focus',
                title: `<img src="${prices.thumb}"> <span class="popCoinName">${prices.coinName}</span>`,
                content: `
                    <div>USD: $${prices.usd}</div>
                    <div>EUR: Є${prices.eur}</div>
                    <div>ILS: ₪${prices.ils}</div>
                `,
                html: true
            });

            // Display popover:
            newPopover.show();
        }
        catch (err) {
            alert("Error: " + err.message);
        }
    }

    // Get more info:
    async function getMoreInfo(coinId) {

        try {
            // Defined prices and return if exist:
            let prices = JSON.parse(localStorage.getItem(coinId));
            if (prices) return prices;

            // If prices doesn't exist, get coins:
            const coins = await getJson("assets/json/coins.json");

            // Loop on coins to find the coinId in the coins list:
            for (const coin of coins) {

                if (coin.id === coinId) {

                    // Defined variable:
                    const [coinName, thumb, usd, eur, ils] = [
                        doCapitalizeFirstLetterOnly(coin.name),
                        coin.image.thumb,
                        coin.market_data.current_price.usd,
                        coin.market_data.current_price.eur,
                        coin.market_data.current_price.ils
                    ];

                    // Update the prices:
                    prices = { coinName, thumb, usd, eur, ils };

                    // Set in local storage:
                    localStorage.setItem(coinId, JSON.stringify(prices));

                    // Delete the prices after 2 minutes:
                    setTimeout(() => {
                        localStorage.removeItem(coinId);
                    }, 2 * 60 * 1000);

                    return prices;
                }
            }
        }
        catch (err) {
            alert("Error: " + err.message);
        }
    }


    // ----- Search Coin Section -------- //

    function searchCoin() {

        // Stop form submit:
        stopFormSubmit();

        // Value of searchBox in lower case:
        const search = $("#searchBox").val().toLowerCase();

        // Search coin and toggle it if exist:
        $("#pageContainer > .card").filter(function () {
            $(this).toggle($(this).find(".card-header > .form-check > span").text().toLowerCase().indexOf(search) > -1)
        });
    }

    // Stop form submit:
    function stopFormSubmit() { event.preventDefault() };


    // Selected coins array:
    const selectedCoinsArr = [];

    // Get selected:
    function getSelected() {

        // Get the "coinName" from attribute of coin:
        const coinName = $(this).attr("data-coin-name");

        // Defined a object of coin name and the html of the card of coin:
        const coinCard = {
            name: coinName,
            symbol: $(`[data-card-name="${coinName}"] > .card-body > h5`).attr("data-coin-symbol"),
            html: document.querySelector(`[data-card-name="${coinName}"]`).outerHTML
        };

        // If is checked so push it to "selectedCoinsArr", if unchecked so remove from "selectedCoinsArr":
        this.checked ? selectedCoinsArr.push(coinCard) : selectedCoinsArr.splice(selectedCoinsArr.findIndex(({ name }) => name === coinName), 1);

        // If "selectedCoinsArr" contain more than 5 coins, so display modal:
        if (selectedCoinsArr.length > 5) displayModal();
    }

    // Display modal with bootstrap:
    function displayModal() {

        // Variable of all cards selected html:
        let selectedCoins = "";

        // Loop for to append the html of coins cards to the "selectedCoins",
        // accept for the last coin that the user tries to insert while displaying the model:
        for (let i = 0; i < selectedCoinsArr.length - 1; i++) {
            selectedCoins += selectedCoinsArr[i].html;
        }

        // Access to modal of cards:
        const cardsModal = document.querySelector("#cardsModal");

        // Display modal with the coins cards:
        cardsModal.innerHTML = `
            <div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">You can choose up to 5 coins! Select a currency to remove:</h1>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${selectedCoins}
                                </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        // Cancel the option toggleMoreInfo of cards in the modal:
        document.querySelectorAll(".modal-body > .card > .moreInfoButtons").forEach(btn => btn.disabled = true);

        // Check all coin cards as checked:
        document.querySelectorAll(".modal-body > .card > .card-header > .form-check > input").forEach(checkBox => checkBox.checked = true);

        // Defined bootstrap modal and display it:
        const myModal = new bootstrap.Modal(document.querySelector("#myModal"));
        myModal.show();

        // Registration for the event clicking on check box:
        const uncheckBoxes = document.querySelectorAll(".modal-body > .card > .card-header > .form-check > input");
        for (const uncheckBox of uncheckBoxes) {
            // If clicked so opposite the check box in home page to the unchecked:
            uncheckBox.addEventListener("click", getUnselected);
        }

        // If user doesn't select coin from modal to unchecked,
        // so unchecked the last coin that he try to adding. 
        $(".modal-header > .btn-close, .modal-footer > .btn-primary").on("click", removeLastCoin);
    }

    // Get unselected:
    function getUnselected() {

        // Get the "coinName" from attribute of coin:
        const coinName = $(this).attr("data-coin-name");

        // Defined a object of coin name and the html of the card of coin:
        const coinCard = {
            name: coinName,
            symbol: $(`[data-card-name="${coinName}"] > .card-body > h5`).attr("data-coin-symbol"),
            html: document.querySelector(`[data-card-name="${coinName}"]`).outerHTML
        };

        // If is unchecked, so remove it from "selectedCoinsArr" and unchecked the coin card in home page:
        if (!this.checked) {
            selectedCoinsArr.splice(selectedCoinsArr.findIndex(({ name }) => name === coinName), 1);
            document.querySelector(`[data-coin-name="${coinCard.name}"]`).checked = false;
        }
        // If checked, so push to "selectedCoinsArr" and checked the coin card in home page:
        else {
            // Unshift is for to add the coin card in the beginning of "selectedCoinsArr":
            selectedCoinsArr.unshift(coinCard);
            document.querySelector(`[data-coin-name="${coinCard.name}"]`).checked = true;
        }
    }

    // Remove last coin:
    function removeLastCoin() {

        // If user doesn't select coin from modal to unchecked,
        // so unchecked the last coin that he try to adding. 
        if (selectedCoinsArr.length > 5) {
            document.querySelector(`[data-coin-name="${selectedCoinsArr[selectedCoinsArr.length - 1].name}"]`).checked = false;
            selectedCoinsArr.pop();
        }
    }


    // --------------------------------------------------------------------- //

    // ----- About Page Container Section -------- //

    function createAbout() {

        let skillsHtml = "";
        const skillsFilesNameArr = ["HTML5", "CSS3", "SASS", "Bootstrap", "Git", "JavaScript", "jQuery", "TypeScript", "React", "NodeJS", "Docker", "MySQL", "AWS", "Angular", "MongoDB"];

        // Entering skills html to "skillHtml":
        for (const fileName of skillsFilesNameArr) {
            skillsHtml += `
                <div class="skill">
                    <svg width="50" height="50">
                        <a href="javascript:void(0);"><image href="assets/images/icons/my skills/${fileName}.png"/></a>
                    </svg>
                    <br>
                    <span>${fileName}</span>
                </div>
            `;
        }

        // Create and display about page:
        pageContainer.innerHTML = `
            <div class="aboutPage">
                <div class="aboutMe">
                    <div class="myStory">
                        <h1>About Me</h1>
                        <h5>I'm a fullstack developer based in Atlit, Israel</h5>
                        <p>Since 2020, I enjoy programming and researching new things and making them simple and doable. When I'm not trying to fix console errors, you'll find me trading the stock market, doing street workouts and enjoying good music.</p>
                    </div>
                    <img src="assets/images/My Photo.jpeg"/>
                </div>
                <div class="mySkills">
                    <h2>My Skills</h2>
                    ${skillsHtml}
                </div>
            </div>

            <p class="copyrights">© All Rights Reserved</p>
        `;

        // After content is added, trigger fadeIn:
        fadeInPage();
    }


    // --------------------------------------------------------------------- //

    // ----- Reports Page Container Section -------- //

    function createReports() {

        // Div with id for report page:
        pageContainer.innerHTML = `<div id="reportsPage"></div>`;

        // Checking if selectedCoinsArr is not empty (if user selected a currency/ies):
        if (selectedCoinsArr.length) {

            // If yes so initial array for coins data:
            const coinsDataArr = [];

            // Initial coinsSymbols for api link:
            let coinsSymbols = "";

            for (let i = 0; i < selectedCoinsArr.length; i++) {

                // Checking the index for the exact syntax for the api:
                i !== (selectedCoinsArr.length - 1) ? coinsSymbols += `${selectedCoinsArr[i].symbol},` : coinsSymbols += `${selectedCoinsArr[i].symbol}`;

                // Push to coins data array an object of symbol and initial data:
                coinsDataArr.push({
                    symbol: selectedCoinsArr[i].symbol,
                    pointsDataCoin: []
                });
            }

            // Canvas setting:
            const options = {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: ""
                },
                axisY: {
                    prefix: "$",
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    dockInsidePlotArea: true,
                    itemclick: toggleDataSeries
                },
                data: [] // Initial array for data of prices of coins
            };

            // Loop on coinsDataArr 
            for (let i = 0; i < coinsDataArr.length; i++) {

                // Checking index for the header of reports canvas:
                if (i !== coinsDataArr.length - 1) options.title.text += coinsDataArr[i].symbol + ", ";
                else options.title.text += coinsDataArr[i].symbol + " to USD";

                // Setting of line:
                options.data.push({
                    type: "line",
                    showInLegend: true,
                    xValueType: "dateTime",
                    yValueFormatString: "$###.00",
                    xValueFormatString: "hh:mm:ss TT",
                    name: coinsDataArr[i].symbol, // Symbol of line
                    dataPoints: coinsDataArr[i].pointsDataCoin // The points array from coinsDataArr
                });
            }

            // Display the reports chart:
            $("#reportsPage").CanvasJSChart(options);

            // Decides whether to display a series of data:
            function toggleDataSeries(e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }

            // Defied variable for update the chart:
            const updateInterval = 2000;
            
            // Get the time now:
            const now = new Date();

            // Update chart function:
            async function updateChart() {

                // Get data (prices) from api:
                const coinsData = await getJson(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsSymbols}&tsyms=USD`);

                // Loop on coinsDataArr to update the data points of all coin:
                for (let i = 0; i < coinsDataArr.length; i++) {

                    // Set the time now + 2s:
                    now.setTime(now.getTime() + updateInterval);

                    // Get the symbol of coin:
                    let symbol = coinsDataArr[i].symbol;

                    // Pushing the new values:
                    coinsDataArr[i].pointsDataCoin.push({
                        x: now.getTime(), // The time now
                        y: coinsData[symbol].USD // The current price of coin
                    });

                    // Updating legend text with updated with y Value 
                    options.data[i].legendText = `${symbol} : $` + coinsData[symbol].USD;
                }
                
                // Rendering the chart:
                $("#reportsPage").CanvasJSChart().render();
            }

            // Generates first set of pointsDataCoins:
            updateChart();

            // Variable Of updating data every 2 second:
            const intervalChartData = setInterval(() => { updateChart() }, updateInterval);

            // Flag for event user clicked on another button, to clear interval and stop updating: 
            let intervalChartDataRunning = true;
            $("#enterPageLink, #homeLink, #aboutLink").on("click", function () {
                if (intervalChartDataRunning) {
                    clearInterval(intervalChartData);
                    intervalChartDataRunning = false;
                }
            });
        }
        else {
            // If selectedCoinsArr is empty:
            document.querySelector("#reportsPage").innerHTML = `<h2>📈 Select one or more coins to view coin reports!</h2>`;
        }

        // After content is added, trigger fadeIn:
        fadeInPage();
    }


    // ---------------------------------------------------------------------------------------- //

    // ----- Parallax the Page Section -------- //

    // Page and speed:
    const parallax = document.querySelectorAll("body");
    const speed = 0.02;

    // Parallax on scroll:
    window.onscroll = function () {
        [].slice.call(parallax).forEach(function (el) {
            // Scrolling down:
            const windowYOffset = window.pageYOffset;
            // Defined the action:
            const elBackgroundPos = "0%" + (windowYOffset * speed) + "px";
            // Activate on page:
            el.style.backgroundPosition = elBackgroundPos;
        });
    };


    // --------------------------------------------------------------------- //

    // ----- Helper Functions Section -------- //

    function fadeInPage() {
        // Trigger fadeIn:
        $("#pageContainer").hide().fadeIn(1000);
    }

    // Get a string and makes the first letter of each word uppercase and all other letters lowercase in recursion:
    function doCapitalizeFirstLetterOnly(string) {

        // Get index of space (if exist) to check if is only one word or more:
        const isSpace = string.indexOf(" ");

        // Stop condition if is only one word and return the word capitalize first letter only:
        if (isSpace === -1) return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

        // If is more than one word return the word capitalize first letter only with the next word recursively:
        if (isSpace !== -1) return string.charAt(0).toUpperCase() + string.slice(1, isSpace).toLowerCase() + " " + doCapitalizeFirstLetterOnly(string.substring(isSpace + 1));
    }

    // Get json from api:
    async function getJson(url) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

})();