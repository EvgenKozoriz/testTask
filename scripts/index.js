const tHeadArr = ['name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const timeArr = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
const tableContainer = document.getElementById('table')
const body = document.body
let tableEvents = {
   'Maria' :[
       {
              id: '0-0',
              text: 'planning session'
         },
        ]
}

function generateTable(memberName) {
    let table = document.createElement('table')

    function generateTableHead() {
        let thead = document.createElement('thead')
        thead.classList.add('thead')
        let tr = document.createElement('tr')
        for(let i = 0; i < tHeadArr.length;i++) {
            let th = document.createElement('th')
            th.innerHTML = tHeadArr[i]
            tr.appendChild(th)
        }
        thead.appendChild(tr)
        table.appendChild(thead)
    }
    
    function generateTableBody(memberName) {
        let tbody = document.createElement('tbody')
        tbody.classList.add('tbody')
        for (let i = 0;i < timeArr.length;i++) {
            let tr = document.createElement('tr')
            let th = document.createElement('th')
            th.innerHTML = timeArr[i]
            tr.appendChild(th)
            for (let j = 0;j < 5;j++) {
                let td = document.createElement('td')
                td.classList.add(`${i}-${j}`)
                if (tableEvents[memberName] !== undefined) {
                    for (let event of tableEvents[memberName]) {
                        if(td.classList.contains(event.id)) {
                            const deleteButton = document.createElement('button')
                            deleteButton.addEventListener('click', () => {
                                let returnedArr = tableEvents[memberName].filter(event => {
                                   return event.id !== `${i}-${j}`
                                })
                                tableEvents[memberName] = returnedArr
                                generateTable(memberName)
                            })
                            deleteButton.innerHTML = 'X'
                            td.innerHTML = `
                            <p> ${event.text}</p>
                            `
                            td.classList.add('actualEvent')
                            td.appendChild(deleteButton)
                        }
                    }
                }
                   
                tr.appendChild(td)
            }
            tbody.appendChild(tr)
        }
        table.appendChild(tbody)
    }

    generateTableHead()
    generateTableBody(memberName)
    tableContainer.innerHTML = ''
    tableContainer.appendChild(table)
}

const newEventBtn = document.getElementById('newEventBtn')

const form = document.querySelector('.newEvent')

newEventBtn.addEventListener('click', () => {
    form.classList.toggle('isVisible')
})

const cancelFormBtn = document.getElementById('cancelBtn')
cancelFormBtn.addEventListener('click', () => {
    form.classList.toggle('isVisible')
})

generateTable('Maria')



const createBtn = document.getElementById('createBtn')
createBtn.addEventListener(('click'), () => {
    const inputName = document.getElementById('inputName')
    const members = document.getElementById('membersSelect')
    const selectedMember = members.options[members.selectedIndex].text
    const days = document.getElementById('daySelect')
    const selectedDay = days.options[days.selectedIndex].value
    const times = document.getElementById('timeSelect')
    const selectedTime = times.options[times.selectedIndex].value

    if(tableEvents[selectedMember]) {
        if(!tableEvents[selectedMember].find(objEvent => {
           return objEvent.id === selectedTime + '-' + selectedDay
        })) {
            tableEvents[selectedMember].push({
                id: selectedTime + '-' + selectedDay,
                text: inputName.value
            })
        }
    } else {
        tableEvents[selectedMember] = [{
            id: selectedTime + '-' + selectedDay,
            text: inputName.value
        }]
    }

    generateTable(selectedMember)
    form.classList.toggle('isVisible')
})

const selectedMember = document.getElementById('selectedMember')
selectedMember.addEventListener('change', () => {
    generateTable(selectedMember.value)
})