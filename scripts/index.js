// ARRAY DI MESI
const months = [
  'Gennaio', // 0
  'Febbraio', // 1
  'Marzo', // 2
  'Aprile', // 3
  'Maggio', // 4
  'Giugno', // 5
  'Luglio', // 6
  'Agosto', // 7
  'Settembre', // 8
  'Ottobre', // 9
  'Novembre', // 10
  'Dicembre', // 11
]


const appointments = []

const now = new Date() 
console.log('ADESSO:', now.getTime())

// recupero da now il mese corrente e lo metto nell'h1
const printCurrentMonthInH1 = function () {
  const title = document.querySelector('h1')
  console.log(now.getMonth()) 
  const monthIndex = now.getMonth() 
  const currentMonth = months[monthIndex] // 'MESE'
  const currentYear = now.getFullYear()
  title.innerText = currentMonth + ' ' + currentYear // 'MESE E ANNO'
}

printCurrentMonthInH1()

const numberOfDaysInCurrentMonth = function () {

  const currentMonth = now.getMonth() 
  const currentYear = now.getFullYear() 

  const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0)
  // new Date() permette di creare una data qualunque fornendo anno, mese, giorno
  console.log(lastDayOfCurrentMonth)
  console.log(lastDayOfCurrentMonth.getDate()) 
  const numberOfDays = lastDayOfCurrentMonth.getDate() 
  return numberOfDays
}

const deSelectOtherCells = function () {
  const previouslySelectedCell = document.querySelector('.selected')
  if (previouslySelectedCell) {
    previouslySelectedCell.classList.remove('selected')
  }
}

// creazione delle CELLE del calendario
const createCellsInCalendar = function () {
  // creare un numero di celle pari al numero dei giorni del mese corrente
  const calendarSection = document.getElementById('calendar')
  const numberOfDays = numberOfDaysInCurrentMonth() 
  for (let i = 0; i < numberOfDays; i++) {
    // scrivo il codice per creare UNA cella ed appenderla
    const dayCell = document.createElement('div') // <div></div>
    // aggiungo alla cella una classe CSS 'day'
    dayCell.classList.add('day') // aggiunge dimensioni, sfondo, etc. <div class="day"></div>
    const dayCellValue = document.createElement('h3') // <h3></h3>
    dayCellValue.innerText = i + 1 // <h3>1</h3>, <h3>2</h3> etc.
    if (i + 1 === now.getDate()) {
      dayCellValue.classList.add('color-epic')
    }

    // la rendo cliccabile:
    dayCell.addEventListener('click', function () {
      // ora cliccandola la evidenzieremo nel calendario
      console.log('HAI CLICCATO UNA CELLA!')
      // una cella cliccata deve diventare "selezionata"

      deSelectOtherCells()

      dayCell.classList.add('selected') 
      const spanToRename = document.getElementById('newMeetingDay')
      spanToRename.innerText = i + 1 + ' ' + months[now.getMonth()] 
      spanToRename.classList.add('hasDay')

      if (appointments[i].length > 0) {
        // ci sono eventi da mostrare
        showAppointments() // mostro la lista
        fillAppointmentsList(i) // riempio la <ul> con gli eventi del giorno i
      } else {
        hideAppointments()
      }
    })

    // appendo il titolo nella cella
    dayCell.appendChild(dayCellValue)
    // appendo la cella al calendario
    calendarSection.appendChild(dayCell)
    appointments.push([])
  }
}

createCellsInCalendar()

const showAppointments = function () {
  const appointmentsSection = document.getElementById('appointments')
  appointmentsSection.style.display = 'block'
}

const hideAppointments = function () {
  const appointmentsSection = document.getElementById('appointments')
  appointmentsSection.style.display = 'none'
}

const fillAppointmentsList = function (cassettino) {
  const list = document.getElementById('appointmentsList') 
  list.innerHTML = ''

  if (appointments[cassettino].length > 0) {
    // se qui dentro ci sono appuntamenti da mostrare
    const appointmentsForTheDay = appointments[cassettino]
    appointmentsForTheDay.sort() 
    for (let i = 0; i < appointmentsForTheDay.length; i++) {
      const newLi = document.createElement('li')
      newLi.innerText = appointmentsForTheDay[i]
      list.appendChild(newLi)
    }
  }
}


const form = document.getElementById('meeting-form')
form.addEventListener('submit', function (e) {
  e.preventDefault() 
  const spanWithDay = document.getElementById('newMeetingDay') 
  let stringSplit = spanWithDay.innerText.split(' ') 
  stringSplit = stringSplit[0] 
  const day = parseInt(stringSplit)
  console.log(day)
  const meetingTimeInput = document.getElementById('newMeetingTime')
  const meetingNameInput = document.getElementById('newMeetingName')

  const finalString =
    spanWithDay.innerText + // 'GIORNO'
    ' - ' +
    meetingTimeInput.value + // 'ORA'
    ' ' +
    meetingNameInput.value // 'EVENTO'
 
  const finalStringLiteral = `${spanWithDay.innerText} - ${meetingTimeInput.value} ${meetingNameInput.value}`

  console.log('APPUNTAMENTO', finalString)
  appointments[day - 1].push(finalString)
  console.log('CASSETTIERA', appointments)

  form.reset()

  
  const selectedCell = document.querySelector('.selected')
  const indicator = document.createElement('span')
  indicator.classList.add('dot')
  selectedCell.appendChild(indicator)

  showAppointments()
  fillAppointmentsList(day - 1)
})