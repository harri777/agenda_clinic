import React from "react";
import dateFns from "date-fns";
import _ from "lodash";

import './Main.css'

let appointments = [
	{
	  id: 1,
	  created_at: 1538587923916,
	  updated_at: 1538587923916,
	  title: 'background',
	  date: '2018-08-30T22:56:01.306Z',
	  start_time: '16:21',
	  end_time: '16:51'
	},
	{
		id: 222,
		created_at: 1538587923916,
		updated_at: 1538587923916,
		title: 'background2222',
		date: '2018-08-30T22:56:01.306Z',
		start_time: '16:21',
		end_time: '16:51'
	},	
	{
	  id: 20,
	  created_at: 1538587923917,
	  updated_at: 1538587923917,
	  title: 'transitional',
	  date: '2018-08-29T15:17:05.798Z',
	  start_time: '08:59',
	  end_time: '09:29'
	}
];

class MainView extends React.Component {
  state = {
    currentWeek: new Date(),
    selectedDate: new Date()
  };

  	componentWillMount = () => {
		appointments = _.groupBy(appointments, function (i) {
			return dateFns.format(i.date, 'DD/MM/YYYY');
		});
  	}

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            Previous Week
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentWeek, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">Next Week</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentWeek);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  	renderAppointments = (day) => {
		if(appointments[day] !== undefined){
			appointments[day].map((item, index) => {
				return (
					<h2>mozao</h2>
				)}
			)
		}
  	}

  renderCells() {
    const { currentWeek, selectedDate } = this.state;
    const monthStart = dateFns.startOfWeek(currentWeek);
    const monthEnd = dateFns.endOfWeek(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
		formattedDate = dateFns.format(day, dateFormat);
		let formattedDate2 = dateFns.format(day, 'DD/MM/YYYY');
		const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>

			{/* {ADICIONAR LÓGICA DE ITEMS AQUI} */}
			{appointments[formattedDate2] !== undefined && (
				appointments[formattedDate2].map((item, index) => {
					return (
						<div Style="    width: 90%;
						margin: 30px 5% 10% 5%;
						background-color: #ff000014;
						border-radius: 6px;
						border: solid 1px red;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 10px;
						cursor: pointer;"
						onClick={() => console.log("teste")}>
							<h5 Style="margin: 0px">Inicio: {item.start_time}</h5>
							<h5 Style="margin: 0px">Fim: {item.end_time}</h5>
							<p Style="width: 90%;
										white-space: nowrap;
										text-overflow: ellipsis;
										overflow: hidden;
										margin: 0px;
										font-family: Muli;
										font-size: 15px;
										text-align: -webkit-auto;">{item.title}</p>
						</div>		
					)}
				))
			}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
    //   selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default MainView;