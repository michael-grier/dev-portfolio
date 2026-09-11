import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount after each test so aria-current assertions only see one render.
afterEach(cleanup);
