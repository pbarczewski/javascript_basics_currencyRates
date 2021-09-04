window.onload = function() {
    rates.initialize();
}

class ExchangeRates {
    url = "http://api.nbp.pl/api/exchangerates/tables/a/last";
    tBody = document.querySelector("#rates tbody");

    initialize() {
        this.loadData();
    }

    loadData() {
        fetch(this.url).then((response) => {
                response.json().then((data)=> {
                    this.parseData(data);
                });
        });
    }

    parseData(data) {
        data = data[0];
    
        this.ratesData = data.rates;
       

        document.querySelector("h2").innerHTML = `Exchange rate - <p style="font-size: 17px">last updated ${data.effectiveDate}</p>` ;

        for(let single in data.rates) {
                this.addRateToTable(data.rates[single]);
        }
    }
        addRateToTable(el) {
            console.log(el);

            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="align-middle">${el.code}</td>
                <td class="align-middle">${el.currency}</td>
                <td class="align-middle">${el.mid} zł</td>
            `;
            
            this.tBody.appendChild(tr);
        }
    
}

const rates = new ExchangeRates();