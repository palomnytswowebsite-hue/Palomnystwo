"use client";
import { Component } from "react";
import data from "./data";
import "./pin.css";

// 🔹 Типи
interface ImageItem {
  img: string;
  alt?: string;
}

interface AppState {
  preview: boolean;
  previewUrl: string;
}

// props у нас немає
interface AppProps {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      preview: false,
      previewUrl: "",
    };
    this.setPreview = this.setPreview.bind(this);
    this.cancelPreview = this.cancelPreview.bind(this);
  }

  // id — number, бо ми використовуємо індекс у data
  setPreview(id: number) {
    this.setState({
      preview: true,
      previewUrl: data[id].img,
    });
  }

  cancelPreview() {
    this.setState({
      preview: false,
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Pinterest Clone</h1>
        </header>
        <div className="gallery">
          {data.map((image: ImageItem, idx: number) => {
            return (
              <div
                key={idx}
                className="item"
                onClick={() => this.setPreview(idx)}
              >
                <img src={image.img} alt={image.alt || "unsplash"} />
              </div>
            );
          })}
          {this.state.preview && (
            <div id="preview" onClick={this.cancelPreview}>
              <img src={this.state.previewUrl} alt="preview" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
