<script>
	import { onMount } from 'svelte';
	import TitleSection from "./components/sections/title-section.svelte";
	import NextEventSection from "./components/sections/next-event-section.svelte";
	import MembersSection from "./components/sections/members-section.svelte";
	import FaqSection from "./components/sections/faq-section.svelte";
	import AboutSite from "./components/sections/about-site-section.svelte";
	import PageSpeed from "./components/sections/page-speed-section.svelte";
	import ContactForm from "./components/sections/contact-form.svelte";
	import SponsorsSection from "./components/sections/sponsors-section.svelte";
	import TheEnd from "./components/sections/the-end.svelte";
</script>

<div class="container">
	<TitleSection />
	<NextEventSection />
	<MembersSection />
	<FaqSection />
	<ContactForm />
	<SponsorsSection />
	<AboutSite />
	<TheEnd />

</div>

<style>
	.container {
	  text-align: center;
	  padding: 0;
	  margin: 0;
	}

	.the-end {
		padding: 20px;
		background: gold;
	}
</style>