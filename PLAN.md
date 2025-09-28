# Plan to Match Design

This plan outlines the necessary changes to make the application match the `active-states-basket-empty.jpg` design.

## 1. Header Horizontal Line

*   **Difference**: The horizontal line in the header is likely thicker and has less vertical padding than in the design.
*   **Todo**:
    *   [x] Adjust the thickness of the bottom border of the header.
    *   [x] Increase the padding below the navigation links to create more space between the links and the line.
    *   [x] Add orange bottom border on hover for navigation links.
    *   [x] Fix layout shift on navigation hover by using a transparent border.

## 2. Avatar Icon

*   **Difference**: The avatar icon is smaller than in the design and may be missing the orange border on hover/active state.
*   **Todo**:
    *   [x] Increase the size of the avatar image.
    *   [x] Add a hover effect to the avatar button to show an orange ring, as seen in the active states of the design.

## 3. "Add to cart" Button

*   **Difference**: The "Add to cart" button's size, shadow, and hover state do not match the design.
*   **Todo**:
    *   [x] Adjust the width and height of the button to match the design.
    *   [x] Add the specified box shadow to the button.
    *   [x] Implement a hover effect for the button (e.g., slight blur or opacity change).

## 4. Cart Button Behavior

*   **Difference**: The cart button is not interactive and lacks a "filled" state. The design shows a dropdown with different content based on whether the cart is empty or full.
*   **Todo**:
    *   [x] Implement a dropdown component that appears when the cart icon is clicked.
    *   [x] The dropdown should have a "Cart" title.
    *   [x] If the cart is empty, the dropdown should display the message "Your cart is empty."
    *   [x] If the cart is not empty, the dropdown should display a list of items.
    *   [x] Each item in the cart list should show a thumbnail, name, price, quantity, total, and a delete icon.
    *   [x] A "Checkout" button should be visible when the cart has items.
    *   [x] The dropdown should be positioned correctly relative to the cart icon.

## 5. Button Sizing

*   **Difference**: The quantity controls and "Add to cart" button are too thick.
*   **Todo**:
    *   [x] Reduce the vertical padding on the quantity controls.
    *   [x] Reduce the vertical padding on the "Add to cart" button.

**Implementation Notes:**

All items have been implemented in `src/main.ts`. The application now reflects the design specifications from the provided images.