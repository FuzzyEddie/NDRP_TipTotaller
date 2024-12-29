function tipTotaller(input) {
  let amounts = input.split(/ IN | OUT /)
  .filter((line) => {
    return /Sale by\s?-? (\S* \S*)/.test(line)
  }).map((line) => {
    let name = line.match(/Sale by\s?-? (\S* \S*)/)[1]
    let tip = 0
    let tipMatch = line.match(/(?:Tip:|Tip Amount) \$(\d*)/)
    console.log(tipMatch)
    if (tipMatch) tip = parseInt(tipMatch[1])
    let income = parseFloat(line.match(/\$([0-9|,]*?\.\d\d)/)[1].replace(',', ''))
    return [name, tip, income]
  })

  amounts.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  })

  let totals = {}
  amounts.forEach((amount) => {
    if (!totals.hasOwnProperty(amount[0])) {
      totals[amount[0]] = {
        tips: [],
        totalTips: 0,
        income: [],
        totalIncome: 0
      }
    }
    if (amount[1]) {
      totals[amount[0]].tips.push(amount[1])
      totals[amount[0]].totalTips += amount[1]
    }
    if (amount[2]) {
      let x = amount[2] - amount[1]
      totals[amount[0]].income.push(x)
      totals[amount[0]].totalIncome += x
    }
  })

  console.log(totals)
  return totals
}

function buildTipTable(obj) {
  let rows = 0
  const tbl = document.createElement("table")
  const tblBody = document.createElement("tbody")

  const names = document.createElement("tr")
  for (let employee in obj) {
    const cell = document.createElement("th")
    const name = document.createTextNode(employee)
    cell.appendChild(name)
    names.appendChild(cell)
    let numTips = obj[employee].tips.length
    if (numTips > rows)
    {
      rows = numTips
    }
  }
  tblBody.appendChild(names)

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr")
    for (let j in obj) {
      const cell = document.createElement("td")
      let tipText = '';
      if (obj[j].tips.length > i) {
        tipText = "$" + obj[j].tips[i]
      }
      const tip = document.createTextNode(tipText)
      cell.appendChild(tip)
      row.appendChild(cell)
    }
    tblBody.appendChild(row)
  }

  const totals = document.createElement("tr")
  for (let employee in obj) {
    const cell = document.createElement("th")
    const name = document.createTextNode("$" + obj[employee].totalTips)
    cell.appendChild(name)
    totals.appendChild(cell)
  }
  tblBody.appendChild(totals)

  tbl.appendChild(tblBody)
  let header = document.createElement('h3')
  header.innerText = 'TIP TOTALS'
  document.body.appendChild(header)
  document.body.appendChild(tbl)
}

function buildIncomeTable(obj) {
  let rows = 0
  const tbl = document.createElement("table")
  const tblBody = document.createElement("tbody")

  const names = document.createElement("tr")
  for (let employee in obj) {
    const cell = document.createElement("th")
    const name = document.createTextNode(employee)
    cell.appendChild(name)
    names.appendChild(cell)
    let numTips = obj[employee].income.length
    if (numTips > rows)
    {
      rows = numTips
    }
  }
  tblBody.appendChild(names)

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr")
    for (let j in obj) {
      const cell = document.createElement("td")
      let tipText = '';
      if (obj[j].income.length > i) {
        tipText = "$" + obj[j].income[i].toFixed(2)
      }
      const tip = document.createTextNode(tipText)
      cell.appendChild(tip)
      row.appendChild(cell)
    }
    tblBody.appendChild(row)
  }

  const totals = document.createElement("tr")
  for (let employee in obj) {
    const cell = document.createElement("th")
    const name = document.createTextNode("$" + obj[employee].totalIncome.toFixed(2))
    cell.appendChild(name)
    totals.appendChild(cell)
  }
  tblBody.appendChild(totals)
  let header = document.createElement('h3')
  header.innerText = 'INCOME TOTALS'
  document.body.appendChild(header)
  tbl.appendChild(tblBody)
  document.body.appendChild(tbl)
}