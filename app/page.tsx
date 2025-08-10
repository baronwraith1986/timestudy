"use client";

/**
 * app/page.tsx
 *
 * This is the landing page for the (Unofficial) Necco Time Studies application.
 * It is built for clarity, polish, and executive readiness while retaining a touch of humor
 * as per the branding voice. This file is intentionally verbose and structured for easy
 * future extension and maintenance.
 */

import React from "react";
import Link from "next/link";
import { AuthButton } from "@/components/auth-button";

/* --------------------------------------------------------------------------
 * Type Definitions
 * -------------------------------------------------------------------------- */

/**
 * ButtonProps - shared props for our CTA buttons
 */
interface ButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
}

/* --------------------------------------------------------------------------
 * Reusable Components
 * -------------------------------------------------------------------------- */

/**
 * CTAButton - A call-to-action button for the homepage
 */
const CTAButton: React.FC<ButtonProps> = ({
  href,
  label,
  variant = "primary",
  ariaLabel,
}) => {
  const baseClasses =
    "px-6 py-3 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryClasses =
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent";
  const secondaryClasses =
    "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500";

  const className = `${baseClasses} ${
    variant === "primary" ? primaryClasses : secondaryClasses
  }`;

  return (
    <Link href={href} aria-label={ariaLabel || label}>
      <span className={className}>{label}</span>
    </Link>
  );
};

/**
 * Section - A simple layout section wrapper
 */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className }) => {
  return <section className={`w-full py-12 ${className || ""}`}>{children}</section>;
};

/**
 * Container - centers content and sets max width
 */
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className || ""}`}>
      {children}
    </div>
  );
};

/**
 * Heading - styled heading
 */
interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600 mb-4 ${
        className || ""
      }`}
    >
      {children}
    </h1>
  );
};

/**
 * Subheading - styled subheading text
 */
interface SubheadingProps {
  children: React.ReactNode;
  className?: string;
}

const Subheading: React.FC<SubheadingProps> = ({ children, className }) => {
  return (
    <p className={`text-lg text-muted-foreground mb-6 ${className || ""}`}>
      {children}
    </p>
  );
};

/**
 * QuoteText - styled quote
 */
interface QuoteTextProps {
  children: React.ReactNode;
  className?: string;
  italic?: boolean;
}

const QuoteText: React.FC<QuoteTextProps> = ({
  children,
  className,
  italic = false,
}) => {
  return (
    <p
      className={`text-base ${
        italic ? "italic text-muted-foreground" : "text-foreground"
      } mb-4 ${className || ""}`}
    >
      {children}
    </p>
  );
};

/**
 * Divider - subtle horizontal line for separation
 */
const Divider: React.FC = () => {
  return <hr className="my-8 border-gray-200" />;
};

/* --------------------------------------------------------------------------
 * Hero Section
 * -------------------------------------------------------------------------- */

const HeroSection: React.FC = () => {
  return (
    <Section className="bg-background flex items-center justify-center min-h-[80vh]">
      <Container className="text-center">
        <Heading>(Unofficial) Necco Time Studies</Heading>

        <Subheading>
          This time study tool was built for Necco staff to track, review, and
          analyze work activities in a way that’s streamlined, efficient, and—
          dare we say—fun.
        </Subheading>

        <QuoteText italic>
          And yes, we’re bringing courageous mutant back. Super mutants even.
        </QuoteText>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <CTAButton href="/sign-up" label="Get Started" variant="primary" />
          <CTAButton href="/sign-in" label="Sign In" variant="secondary" />
          <AuthButton />
        </div>
      </Container>
    </Section>
  );
};

/* --------------------------------------------------------------------------
 * Features Section
 * -------------------------------------------------------------------------- */

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <h3 className="text-xl font-bold mb-2 text-red-600">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          Why You’ll Love This Tool
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Simple to Use"
            description="No confusing menus, no endless clicks—just clear and direct logging of your time."
          />
          <Feature
            title="Built for Necco Staff"
            description="Custom-tailored categories and tracking for the exact work you do every day."
          />
          <Feature
            title="Executive Ready"
            description="Instant dashboards for leadership with key metrics at a glance."
          />
          <Feature
            title="Secure & Private"
            description="Your data stays private, powered by Supabase authentication and database."
          />
          <Feature
            title="Accessible Anywhere"
            description="Whether in the office or remote, you can log and review your time on any device."
          />
          <Feature
            title="Fun to Use"
            description="A touch of humor keeps even time tracking from feeling like a chore."
          />
        </div>
      </Container>
    </Section>
  );
};

/* --------------------------------------------------------------------------
 * Footer
 * -------------------------------------------------------------------------- */

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-6 mt-12">
      <Container className="text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Unofficial Necco Time Studies. Built
          with ❤️ for Necco staff.
        </p>
      </Container>
    </footer>
  );
};

/* --------------------------------------------------------------------------
 * Page Component
 * -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Divider />
      <FeaturesSection />
      <Footer />
    </>
  );
}
