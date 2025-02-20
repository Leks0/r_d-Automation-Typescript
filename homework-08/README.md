# Homework 8: TypeScript API Integration Project

This project demonstrates TypeScript interfaces, classes, inheritance, and API integration

## Project Structure

- **interfaces.ts**: Contains interfaces for API response data and transformed objects
- **api.ts**: Implements async function for fetching typed data from the JSONPlaceholder API
- **userSummary.ts**: Provides a class that transforms complex API data into a simplified format
- **abstraction.ts**: Demonstrates abstract classes and inheritance with a base entity pattern
- **index.ts**: Main entry point demonstrating the usage of all components

## Implementation Details

The project uses TypeScript's interface and class features to handle multi-level JSON data from the JSONPlaceholder API. The data retrieval process is encapsulated in a typed async function that returns properly structured objects.

The transformation logic resides in the constructor of the UserSummary class, which converts complex user data into a simplified format for easier consumption.

Abstract classes demonstrate inheritance patterns with the BaseEntity serving as the foundation for more specific entity types.