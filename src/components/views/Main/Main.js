import React from "react";
import dateFns from "date-fns";

import './Main.css'

class MainView extends React.Component {
  state = {
    currentWeek: new Date(),
    selectedDate: new Date()
  };

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

  renderCompromissos = (day) => {

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
		console.log(formattedDate2)
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
			{formattedDate2 === '12/11/2018' && (
				<div><h2>lol</h2></div>
			)}
			
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
      selectedDate: day
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