import React from "react";
import { PageWrapper } from "../components";

export default class About extends React.Component {
  render() {
    return (
      <PageWrapper>
        <div className='h-full w-full bg-[#04122D]'>
          <h1>About</h1>
          <p>This is the about page.</p>
        </div>
      </PageWrapper>
    );
  }
}