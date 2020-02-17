import * as React from "react";
import { storiesOf } from "@storybook/react";
import { stories } from "../../helpers/stories";
import DatePickerITF from "./DatePicker";
import DatePickerExample from "./DatePickerExample";

const componentName = "Component/Date Picker ITF/Regular";
const componentNameB = "Component/Date Picker ITF/Beach";
const componentNameC = "Component/Date Picker ITF/Disabled";

stories.forEach(story => {
  storiesOf(componentName, module).add(
    `Page: ${story.title}`,
    () => (
      <div className="story-wrapper">
        <div className="story-container">
          <section>
            <div
              style={{
                marginTop: 40,
                float: "right"
              }}
            >
              <div>
                <DatePickerExample />
              </div>
            </div>
          </section>
        </div>
      </div>
    ),
    story.params
  );
});

stories.forEach(story => {
  storiesOf(componentNameB, module).add(
    `Page: ${story.title}`,
    () => (
      <div className="story-wrapper">
        <div className="story-container">
          <section>
            <div
              style={{
                marginTop: 40,
                float: "right"
              }}
            >
              <div>
                <DatePickerITF
                  bemModifier="beach"
                  startDate={null}
                  endDate={null}
                  onDateChange={() => {}}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    ),
    story.params
  );
});

stories.forEach(story => {
  storiesOf(componentNameC, module).add(
    `Page: ${story.title}`,
    () => (
      <div className="story-wrapper">
        <div className="story-container">
          <section>
            <div
              style={{
                marginTop: 40,
                float: "right"
              }}
            >
              <div>
                <DatePickerITF
                  disabled
                  startDate={null}
                  endDate={null}
                  onDateChange={() => {}}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    ),
    story.params
  );
});
