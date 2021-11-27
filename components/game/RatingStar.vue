<template>
  <div id="half-stars-example">
    <div class="rating-group text-3xl flex items-center">
      <input
        id="rating2-0"
        v-model="score"
        class="rating__input rating__input--none"
        checked
        name="rating2"
        value="0"
        type="radio"
      />
      <label aria-label="0 stars" class="rating__label" for="rating2-0"
        >&nbsp;</label
      >
      <label
        aria-label="0.5 stars"
        class="rating__label rating__label--half"
        for="rating2-05"
        ><i class="rating__icon rating__icon--star fa fa-star-half"></i>
      </label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-05"
        value="1"
        type="radio"
      />
      <label aria-label="1 star" class="rating__label" for="rating2-10">
        <i class="rating__icon rating__icon--star fa fa-star"></i>
      </label>

      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-10"
        value="2"
        type="radio"
      />
      <label
        aria-label="1.5 stars"
        class="rating__label rating__label--half"
        for="rating2-15"
        ><i class="rating__icon rating__icon--star fa fa-star-half"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-15"
        value="3"
        type="radio"
      />
      <label aria-label="2 stars" class="rating__label" for="rating2-20"
        ><i class="rating__icon rating__icon--star fa fa-star"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-20"
        value="4"
        type="radio"
      />
      <label
        aria-label="2.5 stars"
        class="rating__label rating__label--half"
        for="rating2-25"
        ><i class="rating__icon rating__icon--star fa fa-star-half"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-25"
        value="5"
        type="radio"
        checked
      />
      <label aria-label="3 stars" class="rating__label" for="rating2-30"
        ><i class="rating__icon rating__icon--star fa fa-star"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-30"
        value="6"
        type="radio"
      />
      <label
        aria-label="3.5 stars"
        class="rating__label rating__label--half"
        for="rating2-35"
        ><i class="rating__icon rating__icon--star fa fa-star-half"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-35"
        value="7"
        type="radio"
      />
      <label aria-label="4 stars" class="rating__label" for="rating2-40"
        ><i class="rating__icon rating__icon--star fa fa-star"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-40"
        value="8"
        type="radio"
      />
      <label
        aria-label="4.5 stars"
        class="rating__label rating__label--half"
        for="rating2-45"
        ><i class="rating__icon rating__icon--star fa fa-star-half"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-45"
        value="9"
        type="radio"
      />
      <label aria-label="5 stars" class="rating__label" for="rating2-50"
        ><i class="rating__icon rating__icon--star fa fa-star"></i
      ></label>
      <input
        v-model="score"
        class="rating__input"
        name="rating2"
        id="rating2-50"
        value="10"
        type="radio"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';

export default defineComponent({
  setup(_, { emit }) {
    const score = ref(0);
    watch(score, () => {
      const rating = Number(score.value);
      emit('set-score', rating);
    });
    return {
      score,
    };
  },
});
</script>

<style scoped>
/*  
 *  Pure CSS star rating that works without reversing order
 *  of inputs
 *  -------------------------------------------------------
 *  NOTE: For the styling to work, there needs to be a radio
 *        input selected by default. There also needs to be a
 *        radio input before the first star, regardless of
 *        whether you offer a 'no rating' or 0 stars option
 *  
 *  This codepen uses FontAwesome icons
 */

/* #half-stars-example { */
/* use display:inline-flex to prevent whitespace issues. alternatively, you can put all the children of .rating-group on a single line */
/* use display:inline-flex to prevent whitespace issues. alternatively, you can put all the children of .rating-group on a single line */
.fa-star-half::before {
  width: 50%;
}
#half-stars-example .rating-group {
  position: relative;
  display: inline-flex;
  align-items: center;
}
#half-stars-example .rating__icon {
  pointer-events: none;
}
#half-stars-example .rating__input {
  position: absolute !important;
  left: -9999px !important;
}
#half-stars-example .rating__label {
  cursor: pointer;
  /* if you change the left/right padding, update the margin-right property of .rating__label--half as well. */
  padding: 0 0.1em;
}
#half-stars-example .rating__label--half {
  padding-right: 0;
  margin-right: -1.2em;
  z-index: 2;
  width: 50% !important;
}
.fa-star-half {
  width: 50%;
}
#half-stars-example .rating__icon--star {
  color: orange;
}
#half-stars-example .rating__icon--none {
  color: #eee;
}
#half-stars-example
  .rating__input--none:checked
  + .rating__label
  .rating__icon--none {
  color: red;
}
#half-stars-example
  .rating__input:checked
  ~ .rating__label
  .rating__icon--star {
  color: #ddd;
}
#half-stars-example .rating-group:hover .rating__label .rating__icon--star,
#half-stars-example
  .rating-group:hover
  .rating__label--half
  .rating__icon--star {
  color: orange;
}
#half-stars-example .rating__input:hover ~ .rating__label .rating__icon--star,
#half-stars-example
  .rating__input:hover
  ~ .rating__label--half
  .rating__icon--star {
  color: #ddd;
}
#half-stars-example
  .rating-group:hover
  .rating__input--none:not(:hover)
  + .rating__label
  .rating__icon--none {
  color: #eee;
}
#half-stars-example
  .rating__input--none:hover
  + .rating__label
  .rating__icon--none {
  color: red;
}
</style>
