    
    <script lang="ts">
    </script>
    
    
    
    <div class={`p-1 m-3 flex flex-col max-h-screen overflow-hidden bg-white dark:bg-gray-900 dark:text-white rounded shadow-lg shadow-black min-w-none w-11/12 sm:min-w-md sm:w-max ${$$props.class}`}>

        {#if $$slots.header}<div class="font-bold text-xl m-4 mt-3"><slot name="header"/></div>{/if}
        <div class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"><slot/></div>
        {#if $$slots.actions}<div class="font-bold text-xl m-2"><slot name="actions"/></div>{/if}
      </div>