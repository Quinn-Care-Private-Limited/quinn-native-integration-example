# Quinn Widgets React Native Integration

> **⚠️ Important**: This integration is specifically designed for **Shopify stores using React Native apps**. It will not work with other e-commerce platforms or web applications.

This repository demonstrates how to integrate Quinn widgets into your React Native application. Quinn widgets allow you to display interactive video content, stories, and carousels in your mobile app.

## Quick Start

To run this example project:

```bash
# Install dependencies
npm install

# Run on Android
npm run android
```

**Note**: This setup is configured using the Quinn native example store. You will need to get your own store configuration from the Quinn team for your specific store.

## Prerequisites

Before integrating Quinn widgets, you'll need:

1. A Shopify store with Quinn admin access
2. React Native project setup
3. Required dependencies installed

## Installation

### Install Required Dependencies

Install the necessary packages in your React Native project:

```bash
npm install @react-native-async-storage/async-storage react-native-video react-native-skeleton-placeholder @react-native-masked-view/masked-view react-native-linear-gradient @quinninc/rn-core
```

Or using yarn:

```bash
yarn add @react-native-async-storage/async-storage react-native-video react-native-skeleton-placeholder @react-native-masked-view/masked-view react-native-linear-gradient @quinninc/rn-core
```

## Integration Steps

### Step 1: Create Quinn Widgets in Admin Portal

1. **Log into your Quinn admin portal** for your Shopify store
2. Navigate to **Video Pages**
3. Click on **"Add videos to new page"** button
4. In the modal, click on the **'Custom page'** tab
   - _Note: The Custom page tab is specifically for creating Quinn widgets for React Native apps_
5. Fill out the form with the following guidelines:
   - **Page Id**: Enter a unique identifier (e.g., "HOMEPAGE", "78647676231")
     - Example: If you want to add a Quinn widget on your product page, you can use the product ID (e.g., 78647676231) as the Page Id and select "PRODUCT" as the Page Type
   - **Page Type**: Select from available types:
     - `PAGE` - General pages
     - `COLLECTION` - Collection pages
     - `PRODUCT` - Product pages
     - `BLOG` - Blog pages
     - `ARTICLE` - Article pages
   - **Other fields**: You can enter any value for other fields

**Important**: The widget handle will be generated in the format: `{PAGE_TYPE}_{PAGE_ID}`

**Example**: If you enter Page Id as "HOMEPAGE" and select Page Type as "PAGE", your widget handle will be `PAGE_HOMEPAGE`

### Step 2: Copy Required Files

Copy these two files from this repository to your React Native project:

1. **`quinn-context-provider.tsx`** - Handles overlay functionality
2. **`quinn-widget.tsx`** - Renders different widget types

You can place these files anywhere in your project structure (e.g., in a `components/`, `src/components/`, or any other directory of your choice).

### Step 3: Initialize Quinn App

In your root file (e.g., `App.tsx` or `index.js`), import and initialize the Quinn app **before using any Quinn components**:

```typescript
import { initApp } from "@quinninc/rn-core/config/app";

// Initialize Quinn app with your store configuration
// Contact the Quinn team to get your specific configuration
initApp({
  // Your Quinn configuration object here
  // This will be provided by the Quinn team
});
```

**Important**: Make sure to initialize the app before using any Quinn components.

### Step 4: Set Up Context Provider

Import and wrap your app with the Quinn overlay context provider:

```typescript
import QuinnOverlayContextProvider from "./components/quinn-context-provider";

function App() {
  return (
    <QuinnOverlayContextProvider>
      {/* Your app components */}
    </QuinnOverlayContextProvider>
  );
}
```

### Step 5: Use Quinn Widgets

Now you can use Quinn widgets anywhere in your app by importing and using the `QuinnWidget` component:

```typescript
import QuinnWidget from "./components/quinn-widget";

function MyComponent() {
  return (
    <View>
      {/* Cards widget */}
      <QuinnWidget handle="PAGE_HOMEPAGE" widgettype="cards" layer={1} />

      {/* Stories widget */}
      <QuinnWidget handle="COLLECTION_SUMMER" widgettype="story" layer={1} />

      {/* Floating popup widget */}
      <QuinnWidget handle="PRODUCT_DETAIL" widgettype="floating" layer={1} />
    </View>
  );
}
```

## Widget Types

Quinn supports three types of widgets:

1. **`cards`** - Displays content in a carousel format
2. **`story`** - Displays content in a stories format
3. **`floating`** - Displays content as a floating popup

## Widget Parameters

- **`handle`**: The widget identifier in format `{PAGE_TYPE}_{PAGE_ID}`
- **`widgettype`**: One of `"cards"`, `"story"`, or `"floating"`
- **`layer`**: Always use `1` for the layer parameter

## Example Integration

Here's a complete example of how to integrate Quinn widgets:

```typescript
import React from "react";
import { View, Text } from "react-native";
import { initApp } from "@quinninc/rn-core/config/app";
import QuinnOverlayContextProvider from "./components/quinn-context-provider";
import QuinnWidget from "./components/quinn-widget";

// Initialize Quinn app
initApp({
  // Your Quinn configuration
});

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome to our app!</Text>

      {/* Homepage cards widget */}
      <QuinnWidget handle="PAGE_HOMEPAGE" widgettype="cards" layer={1} />

      {/* Featured stories */}
      <QuinnWidget handle="PAGE_FEATURED" widgettype="story" layer={1} />
    </View>
  );
}

function App() {
  return (
    <QuinnOverlayContextProvider>
      <HomeScreen />
    </QuinnOverlayContextProvider>
  );
}

export default App;
```

## Getting Help

- **Configuration**: Contact the Quinn team to get your store-specific configuration
- **Widget Creation**: Use the Quinn admin portal to create and manage widgets
- **Technical Support**: Reach out to the Quinn team for technical assistance

## Troubleshooting

1. **Widget not displaying**: Ensure the app is initialized before using widgets
2. **Overlay not working**: Make sure the context provider wraps your app
3. **Dependencies issues**: Run `npm install` or `yarn install` and rebuild your app
4. **Widget handle not found**: Make sure the widget for that handle exists in your Quinn admin portal. Verify that you've created the widget with the correct Page Id and Page Type combination.

## Support

For additional support or questions about Quinn widget integration, please contact the Quinn team.
