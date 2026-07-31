# NOTES

## Overview

This project was built based on my understanding of the assignment requirements. Where requirements were open to interpretation, I chose the simplest implementation that satisfied the specification.

## AI Usage

I used AI throughout the project, primarily for topics I had little or no prior experience with, including parts of the Docker and Prisma setup.

I also used AI to:

* Review parts of my React code.
* Explain concepts I was unfamiliar with.
* Suggest improvements and help troubleshoot issues.

I made an effort to understand the generated code before including it in the project rather than copying it without review.

## Challenges

One issue I encountered was running the project from an external SSD. I experienced problems with the Docker and Prisma setup that did not occur when running the project from an internal drive. After moving the project, the application behaved as expected.

## Optional Features

While developing the required functionality, I also implemented some of the optional tasks where possible. After completing the core requirements, I reviewed the optional features again and completed those that fit naturally into the project, including:

* `resolvedAt` timestamp for resolved incidents.
* Docker health check.
* Incident ordering so open and higher-severity incidents are shown first.

## What I'd Improve With More Time

If I had additional time, I would:

* Add automated tests for the tRPC procedures.
* Improve the UI and overall styling.
* Add filtering and searching for incidents.
* Improve error handling and user feedback throughout the application.
* Expand the health check to include more detailed dependency checks.

## What I Learned

This project gave me hands-on experience with Docker Compose, Prisma, tRPC, and building a full-stack Next.js application. It also improved my understanding of authentication, container networking, and how the different parts of the stack work together.
