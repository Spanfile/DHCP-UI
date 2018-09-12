import { ICollectionConfigProps } from "common/config/IConfigProps";
import { IModalState } from "common/IModal";
import ConfirmModal from "components/ConfirmModal";
import * as React from "react";

export interface IDeletableConfigProps<T> extends ICollectionConfigProps<T> {
  openDeleteModal: () => void;
}

export function DeletableConfig<T>(
  name: string,
  inner: React.ComponentClass<IDeletableConfigProps<T>> | React.StatelessComponent<IDeletableConfigProps<T>>) {
  return class extends React.Component<ICollectionConfigProps<T>, IModalState> {
    constructor(props: ICollectionConfigProps<T>) {
      super(props);

      this.state = {
        isModalOpen: false
      };
    }

    public render(): JSX.Element {
      const Inner = inner;

      return (
        <div>
          <ConfirmModal
            isOpen={this.state.isModalOpen}
            body={"Are you sure you want to delete the " + name + "? This action cannot be undone!"}
            header="Confirm deletion"
            confirm="Yes, delete"
            onConfirm={this.props.onDelete}
            onClose={this.closeModal} />
          <Inner {...this.props} openDeleteModal={this.openModal} />
        </div>
      );
    }

    private openModal = () => {
      this.setState({
        isModalOpen: true
      });
    }

    private closeModal = () => {
      this.setState({
        isModalOpen: false
      });
    }
  };
}