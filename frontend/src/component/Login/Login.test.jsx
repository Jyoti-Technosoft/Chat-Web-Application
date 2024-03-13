import React from 'react';
import { render, screen } from "@testing-library/react";
import Login from './Login.jsx';

describe('Login Component', () => {
    // Render the Login component
    it("should render Register Component Correctly", ()=>{
        render(<Login/>);
        const element = screen.getByText("Chat Application");
        expect(element).toBeInTheDocument();
    })
});
