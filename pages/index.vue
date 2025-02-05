<script setup>
  import { ClientOnly } from "#components";

  const { loggedIn, user, session, fetch, clear } = useUserSession();
  let pmd = usePMD();
  if (loggedIn) {
  }
  async function createShare() {
    if (!pmd.files.value) return;

    const { data } = useFetch("/api/share", {
      method: "POST",
      body: { files: pmd.files.value, metadata: pmd.metadata.value },
    });
  }

  // Fetch existing shares (optional, for debugging)
  const { data: shares } = useFetch("/api/share");
  const statusClass = computed(() => ({
    "bg-green": pmd.status.value === "OPEN",
    "bg-yellow": pmd.status.value === "CONNECTING",
    "bg-red": pmd.status.value === "CLOSED",
  }));

  const userGroups = [
    {
      title: "For Developers",
      intro: "Build and share with confidence",
      features: [
        {
          title: "Instant Sharing",
          description:
            "Share your Activities in seconds directly from your development environment. Perfect for quick feedback cycles.",
        },
        {
          title: "Seamless Integration",
          description:
            "Share directly from your local development environment with the PMD CLI. No extra setup needed.",
        },
      ],
    },
    {
      title: "For Users",
      intro: "Shape the future of Activities",
      features: [
        {
          title: "No Setup Required",
          description:
            "Test new Activities instantly without any development tools or technical knowledge.",
        },
        {
          title: "Direct Feedback",
          description:
            "Try Activities you requested and provide feedback directly to developers during development.",
        },
      ],
    },
    {
      title: "For Reviewers",
      intro: "Streamline the review process",
      features: [
        {
          title: "PR Testing Made Simple",
          description:
            "Import and test Activities directly from Pull Requests without local setup.",
        },
        {
          title: "Efficient Reviews",
          description:
            "Quick access to both code and functionality. Review Activities faster than ever.",
        },
      ],
    },
  ];

  const warnings = [
    {
      title: "Public Code",
      description:
        "All uploaded activity code is publicly visible. Do not share sensitive information.",
      icon: "i-heroicons-exclamation-triangle",
    },
    {
      title: "Unreviewed Code",
      description:
        "Activities are not manually reviewed. Be cautious when adding activities.",
      icon: "i-heroicons-shield-exclamation",
    },
  ];
</script>

<template>
  <main class="mx-auto max-w-360 flex flex-col gap-8 w-4/5">
    <AppHeader :status="pmd.status.value" />

    <!-- Hero Section -->
    <section class="text-center mb-16">
      <h1 class="text-5xl font-bold mb-4 text-white">PreMiD PreView</h1>
      <p class="text-2xl text-gray-100 max-w-3xl mx-auto">
        Where Activities come to life
      </p>
    </section>

    <!-- Action Buttons -->
    <section class="flex justify-center gap-4 mb-16">
      <button
        v-if="pmd.metadata.value"
        @click="createShare"
        class="card hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 transition-all px-8 py-3 text-white font-medium flex items-center gap-3"
      >
        <div class="i-heroicons-share size-6" />
        Share Activity
      </button>
      <NuxtLink
        to="/shares"
        class="card no-underline hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 transition-all px-8 py-3 text-white font-medium flex items-center gap-3"
      >
        <div class="i-heroicons-squares-2x2 size-6" />
        Browse Shares
      </NuxtLink>
      <button
        class="card hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 transition-all px-8 py-3 text-white font-medium flex items-center gap-3"
        disabled
      >
        <div class="i-heroicons-arrow-path-rounded-square size-6" />
        Import from PR
      </button>
    </section>

    <!-- Current Activity Preview (if connected) -->
    <ClientOnly>
      <ActivityCard
        v-if="pmd.metadata.value"
        class="card"
        :metadata="pmd.metadata.value"
      />
    </ClientOnly>

    <!-- Remove Recent Shares section -->

    <!-- How it Works -->
    <section class="mb-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-semibold text-white mb-4">How it Works</h2>
        <p class="text-gray-200">
          Whether you're developing, testing, or reviewing - PreMiD Preview has
          you covered.
        </p>
      </div>

      <!-- Three Perspectives Section -->
      <div class="space-y-12">
        <div
          v-for="(group, index) in userGroups"
          :key="group.title"
          class="relative"
        >
          <!-- Left vertical line -->
          <div
            v-if="index !== userGroups.length - 1"
            class="h-10 w-px bg-[#4b7bf7] opacity-20 absolute left-4 -bottom-10"
          ></div>

          <div class="flex items-center gap-4 mb-6">
            <h2 class="text-3xl font-semibold text-white">{{ group.title }}</h2>
            <div class="relative flex-grow">
              <!-- Single connector with rounded corner -->
              <div class="connector">
                <div
                  class="absolute top-0 right-4 w-[calc(100%-1rem)] h-full"
                  style="
                    border-right: 1px solid rgba(75, 123, 247, 0.2);
                    border-top: 1px solid rgba(75, 123, 247, 0.2);
                    border-top-right-radius: 20px;
                    height: calc(100% + 6rem);
                  "
                />
              </div>
            </div>
          </div>

          <p class="text-gray-200 mb-6 text-lg">{{ group.intro }}</p>
          <div class="grid md:grid-cols-2 gap-8 relative">
            <!-- Horizontal line between cards -->
            <div
              class="absolute top-1/2 left-0 w-full h-px bg-[#4b7bf7] opacity-20"
            />

            <div
              v-for="feature in group.features"
              :key="feature.title"
              class="card p-6 hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 transition-all hover:scale-105 relative z-10"
            >
              <h3 class="font-semibold text-2xl mb-2 text-white">
                {{ feature.title }}
              </h3>
              <p class="text-gray-200">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Security & Transparency -->
    <section class="mb-16">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-semibold text-white mb-4">
          Security & Transparency
        </h2>
        <p class="text-gray-200 max-w-2xl mx-auto">
          We believe in open code and informed decisions.
        </p>
      </div>

      <!-- Benefits Grid -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div
          class="card p-6 flex flex-col items-start gap-4 hover:scale-105 hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 transition-all"
        >
          <div class="flex items-center gap-3">
            <div
              class="i-heroicons-document-magnifying-glass size-8 text-[#4b7bf7]"
            />
            <h3 class="font-semibold text-xl text-white">
              Better Than ZIP Files
            </h3>
          </div>
          <p class="text-gray-200">
            No more sharing ZIP files through DMs. Preview provides a structured
            platform with proper code visibility and security scanning.
          </p>
        </div>

        <div
          class="card p-6 flex flex-col items-start gap-4 hover:scale-105 hover:border-[#4b7bf7] hover:bg-[#4b7bf7]/10 transition-all"
        >
          <div class="flex items-center gap-3">
            <div class="i-heroicons-shield-exclamation size-8 text-[#4b7bf7]" />
            <h3 class="font-semibold text-xl text-white">Security First</h3>
          </div>
          <p class="text-gray-200">
            While we perform basic security checks, always review code before
            installing Activities from unknown sources.
          </p>
        </div>
      </div>

      <!-- Security Notice -->
      <div
        class="card p-4 flex items-center gap-4 hover:scale-105 bg-[#4b7bf7]/5"
      >
        <div class="i-heroicons-information-circle size-5 text-[#4b7bf7]" />
        <p class="text-gray-200 text-sm">
          Remember: Trust the code, not the developer. Always review what you're
          installing, especially if you can't verify the source.
        </p>
      </div>
    </section>
  </main>
</template>

<style>
  .card {
    background: rgba(75, 123, 247, 0.05);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(119, 66, 253, 0.1);
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
    border: 1px solid rgba(78, 62, 187, 0.2);
    @apply hover:border-[#4b7bf7] transition-all duration-300 ease-out;
    position: relative;
  }

  .card hr {
    border: 0;
    display: block;
    width: 100%;
    background-color: rgba(75, 123, 247, 0.2);
    height: 1px;
    border-radius: 4px;
  }

  .status-transition-enter-active,
  .status-transition-leave-active {
    transition: all 0.5s ease;
  }
  .status-transition-enter-from,
  .status-transition-leave-to {
    opacity: 0;
    width: 0;
    transform: scale(0);
  }

  .bg-green {
    background-color: rgba(75, 123, 247, 0.8);
  }
  .bg-yellow {
    background-color: rgba(119, 66, 253, 0.8);
  }
  .bg-red {
    background-color: rgba(42, 17, 65, 0.8);
  }

  .connector {
    position: relative;
    width: 100%;
    height: 1px;
  }
</style>
