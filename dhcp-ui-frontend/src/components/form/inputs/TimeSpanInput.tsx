import IInputProps from "common/IInputProps";
import FormInputRow from "components/form/FormInputRow";
import * as React from "react";

export interface ITimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

export default class TimeSpanInput extends React.Component<IInputProps<number>> {
  constructor(props: IInputProps<number>) {
    super(props);
  }

  public render(): JSX.Element {
    const { hours, minutes, seconds } = this.secondsToTimeSpan(this.props.value!);

    return (
      <FormInputRow {...this.props} innerRow={true}>
        <div className="col-sm-4">
          <label className="col-form-label">
            Hours
            </label>
          <input
            type="number"
            min="0"
            className="form-control rounded-0"
            onChange={event => this.onInputChange("hours", event.target.value)}
            value={hours} />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">
            Minutes
            </label>
          <input
            type="number"
            min="0"
            max="59"
            className="form-control rounded-0"
            onChange={event => this.onInputChange("minutes", event.target.value)}
            value={minutes} />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">
            Seconds
            </label>
          <input
            type="number"
            min="0"
            max="59"
            className="form-control rounded-0"
            onChange={event => this.onInputChange("seconds", event.target.value)}
            value={seconds} />
        </div>
      </FormInputRow>
    );
  }

  private onInputChange(name: string, value: any) {
    const timeSpan = this.secondsToTimeSpan(this.props.value!);
    timeSpan[name] = Number(value);

    this.props.onChange!({
      target: {
        name: this.props.name,
        value: this.timeSpanToSeconds(timeSpan)
      }
    });
  }

  private secondsToTimeSpan(value: number): ITimeSpan {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value % 3600 / 60);
    const seconds = Math.floor(value % 3600 % 60);

    return { hours, minutes, seconds };
  }

  private timeSpanToSeconds(timeSpan: ITimeSpan) {
    return 3600 * timeSpan.hours + 60 * timeSpan.minutes + timeSpan.seconds;
  }
}
