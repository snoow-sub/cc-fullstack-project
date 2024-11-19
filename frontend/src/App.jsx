import { useEffect, useState, useRef } from 'react'
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from '@fullcalendar/core/locales/ja';
import ExtButton from './components/extButton';
import './App.css';

export default function App() {
  const [plans, setPlans] = useState({})
  const [calendar, setCalendar] = useState({})
  const [cooking, setCooking] = useState([])
  const [drinking, setDrinking] = useState([])

  const today = new Date().toLocaleDateString('sv-SE')
  const prevCalendar = useRef();
  const prevPlans = useRef();

  async function getPlans () {
    try {
      const response = await fetch("http://localhost:3001/api/view")
      if  (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const responseData = await response.json()
      let cookData = responseData.filter((item) => item.cooking === true)
      cookData = cookData.map((item) => {
        return {
          title: item.cookTitle,
          start: item.date,
          end: item.date,
          color: 'orange',
          textColor: 'black'
        }
      })
      setCooking(cookData)
      let drinkData = responseData.filter((item) => item.drinking === true)
      drinkData = drinkData.map((item) => {
        return {
          title: item.drinkTitle,
          start: item.date,
          end: item.date,
          color: 'purple',
          textColor: 'white'
        }
      })
      setDrinking(drinkData)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  function addDrink (title, start, end) {
    setDrinking((currentDrink) => [...currentDrink, {title, start, end, color: 'purple', textColor: 'white', allDay: true}])
  }

  function addCook (title, start, end) {
    setCooking((currentCook) => [...currentCook, {title, start, end, color: 'orange', textColor: 'black', allDay: true}])
  }

  function deleteDrink (title) {
    setDrinking((currentDrink) => currentDrink.filter((item) => item.title !== title))
  }

  function deleteCook (title) {
    setCooking((currentCook) => currentCook.filter((item) => item.title !== title))
  }

  function alldeleteDrink() {
    const currentDate = new Date();
    setDrinking((currentDrink) => currentDrink.filter((item) => {
      const itemDate = new Date(item.start);
      return itemDate.getMonth() !== currentDate.getMonth() || itemDate.getFullYear() !== currentDate.getFullYear();
    }));
  }
  
  function alldeleteCook() {
    const currentDate = new Date();
    setCooking((currentCook) => currentCook.filter((item) => {
      const itemDate = new Date(item.start);
      return itemDate.getMonth() !== currentDate.getMonth() || itemDate.getFullYear() !== currentDate.getFullYear();
    }));
  }  

  useEffect(() => {
    getPlans()
  }, [])

  useEffect(() => {
    const updatedPlans = [...cooking, ...drinking]
    setPlans(updatedPlans)
  }, [cooking, drinking])

  useEffect(() => {
    if (prevPlans.current !== plans) {
      let calendarEl = document.getElementById('calendar');
      calendarEl = new Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: today,
        locales: jaLocale,
        locale: 'ja',
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        },
        buttonText: {
          prev:     '<',
          next:     '>',
          today:    '今日',
          month:    '月',
          week:     '週',
        },
        weekends: false,
        events: plans,
        selectable: true,
        select: function (info) {
          const eventName = prompt("追加したいイベント名(飲み会 or 夕食)を入力して下さい")
          let title = "";
          if (eventName === '飲み会') {
            title = prompt("飲み会のタイトルを入力して下さい")
            addDrink(title, info.start, info.end)
          } else if (eventName === '夕食') {
            title = prompt("夕食のタイトルを入力して下さい")
            addCook(title, info.start, info.end)
          } else {
            window.alert('飲み会か夕食を入力して下さい')
          }
        },
        eventClick: function (info) {
          const answer = prompt(info.event.title + "を削除してよろしいですか？（はい/いいえ）")
          if (answer === 'はい' || answer == 'yes') {
            if (info.event.backgroundColor === 'orange') {
              deleteCook(info.event.title)
            } else if (info.event.backgroundColor === 'purple') {
              deleteDrink(info.event.title)
            } else {
              console.log('error')
              window.alert('削除できませんでした')
            }
          } else {
            window.confirm('削除をキャンセルしました')
          }
        }
      });
      prevPlans.current = plans
      if (prevCalendar.current !== calendarEl) {
        setCalendar(calendarEl)
        prevCalendar.current = calendarEl
        calendarEl.render()
      }
    }
  }, [calendar, plans, today])

  return (
    <div>
      <ExtButton
        alldeleteCook={() => alldeleteCook()}
        alldeleteDrink={() => alldeleteDrink()}
      />
      <div id='calendar' />
    </div>
  )
}