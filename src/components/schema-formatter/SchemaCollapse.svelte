<script>
  export let title;
  export let beforeText;
  export let afterText;
  export let collapseText;
  export let open = false;

  function handleClick() {
    open = !open;
  }
</script>

<div class="schema-view {open ? 'schema-open' : 'schema-closed'}" data-bracket-after={afterText}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h5 data-bracket-before={beforeText} on:click={handleClick}>{title}</h5>
  {#if open}
    <div class="schema-content">
      <slot />
    </div>
  {:else}
    <span>{collapseText}</span>
  {/if}
</div>

<style lang="scss">
  .schema-view {
    position: relative;

    > h5 {
      display: inline-block;
      position: relative;
      padding: 0 30px 0 0;
      margin: 0;
      cursor: pointer;
      height: 20px;

      &::before {
        content: "";
        position: absolute;
        background: transparent url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
        background-size: 40px;
        background-position: center;
        width: 20px;
        height: 20px;
        top: 50%;
        right: 0;
        transform: translateY(-50%) rotate(-90deg);
        transition: ease-in-out transform 250ms;
      }
    }

    > .schema-content {
      padding: 8px 16px;
    }
  }

  .schema-view.schema-open {
    margin-bottom: 32px;

    &::after {
      content: attr(data-bracket-after);
      position: absolute;
    }

    > h5 {
      padding: 0 60px 0 0;

      &::before {
        right: 30px;
        transform: translateY(-50%);
      }

      &::after {
        content: attr(data-bracket-before);
        position: absolute;
        right: 12px;
      }
    }
  }
</style>
