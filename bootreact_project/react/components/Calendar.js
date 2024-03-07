import React, { useEffect } from 'react';
import '../css/calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // 월간/주간/일간 뷰
import timeGridPlugin from '@fullcalendar/timegrid'; // 일간/주간 뷰
import interactionPlugin from '@fullcalendar/interaction'; // for selectable(선택 가능한 일정 등)

const Calendar = () => {
    useEffect(() => {
        // FullCalendar 초기화 로그
        // console.log('FullCalendar is initializing...');

        const calendarEl = document.getElementById('calendar');
        // const calendar = new FullCalendar.Calendar(calendarEl, {
        const calendar = new FullCalendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            selectable: true,
            locale: 'ko',
            editable: true,
            eventLimit: true,
            events: [
                // {
                //     title: "김**님 오후 3시 예약",
                //     start: "2024-02-01",
                // },
                // {
                //     title: "이**님 오후 1시 예약",
                //     start: "2024-02-18",
                // },
                // {
                //     title: "박**님 오전 10시 예약",
                //     start: "2024-02-21",
                // },
                // {
                //     title: "최**님 오후 5시 예약",
                //     start: "2024-02-13",
                // },
                // {
                //     title: "양**님 오후 7시 예약",
                //     start: "2024-02-13",
                // },
            ],
        });
        calendar.render();

        // FullCalendar가 정상적으로 초기화되었을 때 출력되는 로그
        // console.log('FullCalendar is successfully initialized!');

        // 컴포넌트가 언마운트될 때 FullCalendar 인스턴스 정리
        // 버전 6.x에서는 인스턴스를 생성하고 렌더링한 후 컴포넌트가 언마운트될 때 자동으로 정리(clean-up)
        // 명시적으로 destroy를 호출할 필요 X
        return () => {
            // if (calendar.destroy) {
            //     calendar.destroy();
            // }

            // FullCalendar 파괴 로그
            // console.log('FullCalendar is destroyed.');
        };
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div id="calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable="true"
                events={[
                    {
                        title: "김**님 오후 3시 예약",
                        start: "2024-02-01",
                    },
                    {
                        title: "이**님 오후 1시 예약",
                        start: "2024-02-18",
                    },
                    {
                        title: "박**님 오전 10시 예약",
                        start: "2024-02-21",
                    },
                    {
                        title: "최**님 오후 5시 예약",
                        start: "2024-02-13",
                    },
                    {
                        title: "양**님 오후 7시 예약",
                        start: "2024-02-13",
                    },
                    {
                        title: "양**님 오후 7시 예약",
                        start: "2024-03-05",
                    },
                ]}
            />
        </div>
    );
};

export default Calendar;
