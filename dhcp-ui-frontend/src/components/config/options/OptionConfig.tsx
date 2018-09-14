import { IOptionConfig } from "common/config/IOptionsConfig";
import Button, { ButtonStyle } from "components/Button";
import { DeletableConfig } from "components/config/DeletableConfig";
import * as React from "react";

export const OptionConfig = DeletableConfig<IOptionConfig>("option", props =>
  <div className="form-row pb-3 m-0">
    <div className="col-sm-5">
      <label className="col-form-label">
        Option
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        onChange={event => props.onChange("name", event.target.value)}
        value={props.config.name} />
    </div>
    <div className="col-sm-5">
      <label className="col-form-label">
        Expression
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        onChange={event => props.onChange("expression", event.target.value)}
        value={props.config.expression} />
    </div>
    <div className="col-sm-2" style={{ paddingTop: "38px" }}>
      <div className="float-right">
        <Button style={ButtonStyle.Danger} onClick={props.openDeleteModal}>
          Delete
        </Button>
      </div>
    </div>
  </div>);
