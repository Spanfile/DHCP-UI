import { ICollectionConfigProps } from "common/config/IConfigProps";
import IModalState from "common/IModalState";
import ConfirmModal from "components/modal/ConfirmModal";
import * as React from "react";

export interface IDeletableConfigProps<T> extends ICollectionConfigProps<T> {
  openDeleteModal: () => void;
}

export function DeletableConfig<T>(
  name: string,
  inner: React.ComponentClass<IDeletableConfigProps<T>> | React.StatelessComponent<IDeletableConfigProps<T>>):
  React.ComponentClass<ICollectionConfigProps<T>> {
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
            header="Confirm deletion"
            confirm="Yes, delete"
            onConfirm={this.props.onDelete}
            onClose={this.closeModal}>
            <p>{"Are you sure you want to delete the " + name + "? This action cannot be undone!"}</p>
          </ConfirmModal>
          <Inner {...this.props} openDeleteModal={this.openModal} />
        </div>
      );
    }

    private readonly openModal = () => {
      this.setState({
        isModalOpen: true
      });
    }

    private readonly closeModal = () => {
      this.setState({
        isModalOpen: false
      });
    }
  };
}
