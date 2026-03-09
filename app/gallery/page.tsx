"use client";
import { Component } from "react";
import data from "./data";
import NavLinks from "../Components/navLinks";
import { NavMenu } from "../Components/navMenu";
import { Footer } from "../Components/footer";
import "./pin.css";

interface ImageItem {
  img: string;
  alt?: string;
}

interface AppState {
  preview: boolean;
  previewUrl: string;
}

interface AppProps {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      preview: false,
      previewUrl: "",
    };
  }

  setPreview = (id: number) => {
    this.setState({
      preview: true,
      previewUrl: data[id].img,
    });
  };

  cancelPreview = () => {
    this.setState({
      preview: false,
      previewUrl: "",
    });
  };

  render() {
    return (
      <div className="app">
        <NavLinks />
        <NavMenu />

        <header>
          <h1 className="marmelad-font bg-[#E6D8C3] m-0 p-2.5 text-3xl font-bold text-center text-[#5D866C]">
            Наша Галерея
          </h1>
        </header>

        <div className="gallery p-6">
          {data.map((image: ImageItem, idx: number) => (
            <div
              key={idx}
              className="item"
              onClick={() => this.setPreview(idx)}
            >
              <img src={image.img} alt={image.alt || "gallery image"} />
            </div>
          ))}

          {this.state.preview && (
            <div id="preview" onClick={this.cancelPreview}>
              <img src={this.state.previewUrl} alt="preview" />

              {/* кнопка закриття */}
              <button className="closeBtn" onClick={this.cancelPreview}>
                ✕
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}
