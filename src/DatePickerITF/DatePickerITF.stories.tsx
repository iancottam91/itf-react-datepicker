import * as React from "react";
import { storiesOf } from "@storybook/react";
import DatePickerExample from "./DatePickerExample";

const componentName = "Component/Date Picker ITF/Regular";


  storiesOf(componentName, module).add(
    `Page:`,
    () => (
      <div className="story-wrapper">
        <div className="story-container">
          <section>
            <div
              style={{
                marginTop: 40,
                float: "left"
              }}
            > 
              <div>
                <DatePickerExample
                  initialStartDate={new Date(2018, 20, 10)}
                  initialEndDate={new Date()}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  );