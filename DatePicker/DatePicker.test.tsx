import React from "react";
import * as helpers from "./helpers";
import { yearOpts } from "./mockdata";
import DatePickerExample from "./DatePickerExample";
import { mount } from "enzyme";
import MockDate from "mockdate";

describe("Date Picker helpers", () => {
  describe("getFirstDayOfMonth", () => {
    it("should return the correct dates", () => {
      expect(helpers.getFirstDayOfMonth(2019, 3)).toBe(4);
      expect(helpers.getFirstDayOfMonth(2015, 11)).toBe(6);
      expect(helpers.getFirstDayOfMonth(2011, 6)).toBe(2);
      expect(helpers.getFirstDayOfMonth(1982, 12)).toBe(2);
    });
  });

  describe("getDaysInMonth", () => {
    it("will return the number of days in a month", () => {
      expect(helpers.getDaysInMonth(2019, 3)).toBe(31);
      expect(helpers.getDaysInMonth(1971, 11)).toBe(30);
      expect(helpers.getDaysInMonth(2016, 2)).toBe(29);
      expect(helpers.getDaysInMonth(2019, 2)).toBe(28);
    });
  });

  describe("yearSelectionOpts", () => {
    it("will return the year options for the dropdown with the relevant years disabled", () => {
      expect(helpers.yearSelectionOpts(2019, 2, 2000)).toEqual(yearOpts);
    });
  });

  describe("datesAreOnSameDay", () => {
    it("will check if two dates are on the same day", () => {
      const dateA = new Date(2019, 3, 1);
      const dateB = new Date(2019, 3, 1);
      const dateC = new Date(2009, 3, 1);
      expect(helpers.datesAreOnSameDay(dateA, dateB)).toBe(true);
      expect(helpers.datesAreOnSameDay(dateA, dateC)).toBe(false);
      expect(helpers.datesAreOnSameDay(dateB, dateA)).toBe(true);
    });
  });

  describe("isDateInRange", () => {
    it("will check if a date falls between two other dates", () => {
      const dateA = new Date(2018, 3, 11);
      const dateB = new Date(2019, 7, 1);
      const dateC = new Date(2009, 3, 1);
      expect(helpers.isDateInRange(dateA, dateC, dateB)).toBe(true);
      expect(helpers.isDateInRange(dateB, dateA, dateC)).toBe(false);
      expect(helpers.isDateInRange(dateC, dateB, dateA)).toBe(false);
      expect(helpers.isDateInRange(dateA, dateB, dateA)).toBe(false);
    });
  });
});

describe("datepicker interactivity", () => {
  beforeEach(() => {
    MockDate.set(1434319925275);
  });

  afterEach(() => {
    MockDate.reset();
  });

  it("Should display the dates when I click start date", done => {
    let wrapper = mount(<DatePickerExample />);
    let startDate = wrapper.find(".datepicker-itf__input--start");
    startDate.simulate("focus");

    setImmediate(() => {
      wrapper.update();
      let label = wrapper.find(".datepicker-itf__input-label");
      expect(label.text()).toEqual("Select a start date");
      expect(wrapper.find(".datepicker-itf__days").length).toBe(1);
      done();
    });
  });

  it("Should not change the start start when i click a disabled date", done => {
    let wrapper = mount(<DatePickerExample />);
    let startDate = wrapper.find(".datepicker-itf__input--start");
    startDate.simulate("focus");

    setImmediate(() => {
      wrapper.update();

      // click a disabled date
      let date = wrapper.find(".datepicker-itf__date--disabled button").at(1);
      date.simulate("click");

      let x = wrapper.find(".datepicker-itf__input--start");
      expect(x.prop("value")).toEqual("");
      done();
    });
  });

  it("Should change the start start when i click an non disabled date and focus on the end date", done => {
    let wrapper = mount(<DatePickerExample />);
    let startDate = wrapper.find(".datepicker-itf__input--start");
    startDate.simulate("focus");

    setImmediate(() => {
      wrapper.update();

      // click a non disabled date
      let date = wrapper.find(".datepicker-itf__date button").at(10);
      date.simulate("click");

      let x = wrapper.find(".datepicker-itf__input--start");
      expect(x.prop("value")).toEqual("6/11/2015");

      let label = wrapper.find(".datepicker-itf__input-label");
      expect(label.text()).toEqual("Select an end date");
      done();
    });
  });

  it("Should display the dates when I click end date", done => {
    let wrapper = mount(<DatePickerExample />);
    let endDate = wrapper.find(".datepicker-itf__input--end");
    endDate.simulate("focus");

    setImmediate(() => {
      wrapper.update();
      let label = wrapper.find(".datepicker-itf__input-label");
      expect(label.text()).toEqual("Select an end date");
      expect(wrapper.find(".datepicker-itf__days").length).toBe(1);
      done();
    });
  });

  it("Should change the end date when i click an non disabled date", done => {
    let wrapper = mount(<DatePickerExample />);
    let endDate = wrapper.find(".datepicker-itf__input--end");
    endDate.simulate("focus");

    setImmediate(() => {
      wrapper.update();
      let datesBefore = wrapper.find(".datepicker-itf__dates");
      expect(datesBefore.length).toBe(1);

      // click a non disabled date
      let date = wrapper.find(".datepicker-itf__date button").at(12);
      date.simulate("click");

      let x = wrapper.find(".datepicker-itf__input--end");
      expect(x.prop("value")).toEqual("6/13/2015");

      let datesAfter = wrapper.find(".datepicker-itf__dates");
      expect(datesAfter.length).toBe(0);
      done();
    });
  });

  it("Should reset the dates when i click 'clear dates'", done => {
    let wrapper = mount(
      <DatePickerExample
        initialStartDate={new Date(2019, 2, 1)}
        initialEndDate={new Date(2019, 5, 5)}
      />
    );

    let startDate = wrapper.find(".datepicker-itf__input--start");
    let endDate = wrapper.find(".datepicker-itf__input--end");
    expect(startDate.prop("value")).toEqual("3/1/2019");
    expect(endDate.prop("value")).toEqual("6/5/2019");
    startDate.simulate("focus");

    setImmediate(() => {
      wrapper.update();
      let clearBtn = wrapper.find(".datepicker-itf__clear-dates button");
      clearBtn.simulate("click");
      let startDateNext = wrapper.find(".datepicker-itf__input--start");
      let endDateNext = wrapper.find(".datepicker-itf__input--end");
      expect(startDateNext.prop("value")).toEqual("");
      expect(endDateNext.prop("value")).toEqual("");
      done();
    });
  });

  it("Should display the correct dates for the month selected'", done => {
    let wrapper = mount(<DatePickerExample />);
    let startDate = wrapper.find(".datepicker-itf__input--start");
    startDate.simulate("focus");

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(".datepicker-itf__date--outside-month").length).toBe(
        12
      );
      expect(wrapper.find(".datepicker-itf__date").length).toBe(42);
      done();
    });
  });
});
