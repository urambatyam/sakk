<template>
    <div
        :id="puppetId"
        class="puppet-container"
        :draggable="draggable"
        @dragstart="dragStart"
    >
        <slot />
    </div>
</template>

<script>
export default {
    props: ['puppetId', 'draggable'],
    methods: {
        dragStart(e) {  
            const target = e.target;  
            e.dataTransfer.setData('puppetId', target.id);
            setTimeout(() => {
                target.style.display = 'none';
            }, 0);
        }
    }
}
</script>