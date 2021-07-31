import React, { Component } from "react";
import Container from "./components/Container/Container.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Modal from "./components/Modal/Modal.jsx";
import Button from "./components/Button/Button.jsx";
import api from "./services/gallery-api";
import s from "./App.module.css";
import Loader from "react-loader-spinner";
// import toast, { Toaster } from "react-hot-toast";

class App extends Component {
  state = {
    imgGallery: [],
    imgName: "",
    pageNum: 1,
    selectedObg: null,
    status: "idle",
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.imgGallery.length === 0 &&
      this.state.status === "resolved"
    ) {
      alert(`Sorry, we did not find such pictures ${this.state.imgName}`);

      this.setState({
        status: "idle",
      });
    }

    if (this.state.status === "pending") {
      try {
        await api(this.state.imgName, this.state.pageNum).then(
          (NewImgGallery) =>
            this.setState((prevState) => ({
              imgGallery: [...prevState.imgGallery, ...NewImgGallery],
              status: "resolved",
            }))
        );
      } catch {
        alert(`Pixabay is dead`);
        this.setState({ error: "error", status: "rejected" });
      }
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  searchBarInputValueHandler = (InputValue) => {
    if (InputValue.trim() !== "") {
      this.setState({
        imgName: InputValue,
        status: "pending",
      });
    }

    if (this.state.imgName !== InputValue) {
      this.setState({
        imgGallery: [],
        pageNum: 1,
      });
    }
  };

  loadMoreBtnHandler = () => {
    this.setState((prevState) => ({
      pageNum: (prevState.pageNum += 1),
      status: "pending",
    }));
  };

  handleSelectObg = (obg) => {
    this.setState({
      selectedObg: obg,
      showLoader: true,
    });
  };

  toggleMdl = (evt) => {
    this.setState(({ selectedObg }) => ({
      selectedObg: null,
    }));
  };

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.searchBarInputValueHandler} />
        <ImageGallery
          imgArr={this.state.imgGallery}
          onSelect={this.handleSelectObg}
        ></ImageGallery>
        {this.state.status === "resolved" && (
          <Button onLoadMore={this.loadMoreBtnHandler} />
        )}

        {this.state.selectedObg && (
          <Modal onClose={this.toggleMdl}>
            <img
              src={this.state.selectedObg.largeImageURL}
              alt={this.state.selectedObg.largeImageURL}
            />
            <button type="button" onClick={this.toggleMdl}>
              Close
            </button>
          </Modal>
        )}

        {this.state.status === "pending" && (
          <div className={s.loader}>
            <Loader type="Puff" color="#00BFFF" height={200} width={200} />
            <p className={s.p}>Loading...</p>
          </div>
        )}
      </Container>
    );
  }
}

export default App;
